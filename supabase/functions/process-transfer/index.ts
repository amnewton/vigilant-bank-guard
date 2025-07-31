import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface TransferRequest {
  fromAccountId: string
  toAccountId?: string
  transferType: 'internal' | 'external' | 'wire'
  amount: number
  description?: string
  recipientName?: string
  recipientEmail?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Get user from JWT
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      throw new Error('Invalid authentication')
    }

    // Parse request body
    const {
      fromAccountId,
      toAccountId,
      transferType,
      amount,
      description = '',
      recipientName,
      recipientEmail
    }: TransferRequest = await req.json()

    // Validate input
    if (!fromAccountId || !transferType || !amount || amount <= 0) {
      throw new Error('Invalid transfer parameters')
    }

    // Verify from account belongs to user
    const { data: fromAccount, error: fromAccountError } = await supabaseClient
      .from('accounts')
      .select('*')
      .eq('id', fromAccountId)
      .eq('user_id', user.id)
      .single()

    if (fromAccountError || !fromAccount) {
      throw new Error('Source account not found or unauthorized')
    }

    // Check if account has sufficient balance
    if (fromAccount.balance < amount) {
      throw new Error('Insufficient funds')
    }

    // For internal transfers, verify destination account
    let toAccount = null
    if (transferType === 'internal' && toAccountId) {
      const { data: toAccountData, error: toAccountError } = await supabaseClient
        .from('accounts')
        .select('*')
        .eq('id', toAccountId)
        .eq('user_id', user.id)
        .single()

      if (toAccountError || !toAccountData) {
        throw new Error('Destination account not found or unauthorized')
      }
      toAccount = toAccountData
    }

    // Start transaction
    const { data: transfer, error: transferError } = await supabaseClient
      .from('transfers')
      .insert({
        from_account_id: fromAccountId,
        to_account_id: toAccountId || null,
        transfer_type: transferType,
        amount: amount,
        description: description,
        recipient_name: recipientName || null,
        recipient_email: recipientEmail || null,
        status: 'pending'
      })
      .select()
      .single()

    if (transferError) {
      throw new Error(`Failed to create transfer: ${transferError.message}`)
    }

    try {
      // Generate reference numbers
      const { data: debitRefNumber } = await supabaseClient.rpc('generate_reference_number')
      const { data: creditRefNumber } = await supabaseClient.rpc('generate_reference_number')

      // Debit from source account
      const { error: debitError } = await supabaseClient
        .from('accounts')
        .update({ balance: fromAccount.balance - amount })
        .eq('id', fromAccountId)

      if (debitError) {
        throw new Error('Failed to debit source account')
      }

      // Create debit transaction
      await supabaseClient
        .from('transactions')
        .insert({
          account_id: fromAccountId,
          transaction_type: 'debit',
          amount: amount,
          description: `Transfer to ${toAccount?.account_name || recipientName || 'External Account'}`,
          reference_number: debitRefNumber,
          status: 'completed'
        })

      // For internal transfers, credit destination account
      if (transferType === 'internal' && toAccount) {
        const { error: creditError } = await supabaseClient
          .from('accounts')
          .update({ balance: toAccount.balance + amount })
          .eq('id', toAccountId)

        if (creditError) {
          throw new Error('Failed to credit destination account')
        }

        // Create credit transaction
        await supabaseClient
          .from('transactions')
          .insert({
            account_id: toAccountId,
            transaction_type: 'credit',
            amount: amount,
            description: `Transfer from ${fromAccount.account_name}`,
            reference_number: creditRefNumber,
            status: 'completed'
          })
      }

      // Update transfer status
      await supabaseClient
        .from('transfers')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', transfer.id)

      // Create security alert
      await supabaseClient.rpc('create_security_alert', {
        p_user_id: user.id,
        p_alert_type: 'transaction',
        p_severity: amount > 10000 ? 'high' : 'medium',
        p_title: 'Transfer Completed',
        p_description: `${transferType} transfer of $${amount.toFixed(2)} completed successfully.`
      })

      return new Response(
        JSON.stringify({
          success: true,
          transfer: {
            id: transfer.id,
            amount: amount,
            status: 'completed',
            transferType: transferType,
            description: description
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )

    } catch (error) {
      // Rollback transfer status on error
      await supabaseClient
        .from('transfers')
        .update({ status: 'failed' })
        .eq('id', transfer.id)

      throw error
    }

  } catch (error) {
    console.error('Error processing transfer:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})