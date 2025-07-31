import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CreateAccountRequest {
  accountType: 'checking' | 'savings' | 'investment' | 'credit'
  accountName: string
  initialDeposit?: number
  creditLimit?: number
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
    const { accountType, accountName, initialDeposit = 0, creditLimit }: CreateAccountRequest = await req.json()

    // Validate input
    if (!accountType || !accountName) {
      throw new Error('Account type and name are required')
    }

    // Generate account number
    const { data: accountNumberData, error: accountNumberError } = await supabaseClient
      .rpc('generate_account_number')

    if (accountNumberError) {
      throw new Error('Failed to generate account number')
    }

    const accountNumber = accountNumberData

    // Set interest rates based on account type
    const interestRates = {
      checking: 0.0005, // 0.05%
      savings: 0.0420,  // 4.20%
      investment: 0.0785, // 7.85%
      credit: 0.1899    // 18.99%
    }

    // Create account
    const { data: account, error: accountError } = await supabaseClient
      .from('accounts')
      .insert({
        user_id: user.id,
        account_type: accountType,
        account_name: accountName,
        account_number: accountNumber,
        balance: accountType === 'credit' ? 0 : initialDeposit,
        credit_limit: accountType === 'credit' ? creditLimit : null,
        interest_rate: interestRates[accountType],
        status: 'active'
      })
      .select()
      .single()

    if (accountError) {
      throw new Error(`Failed to create account: ${accountError.message}`)
    }

    // Create initial deposit transaction if applicable
    if (initialDeposit > 0 && accountType !== 'credit') {
      const { data: refNumber } = await supabaseClient.rpc('generate_reference_number')
      
      await supabaseClient
        .from('transactions')
        .insert({
          account_id: account.id,
          transaction_type: 'credit',
          amount: initialDeposit,
          description: 'Initial deposit',
          reference_number: refNumber,
          status: 'completed'
        })
    }

    // Create security alert for new account
    await supabaseClient.rpc('create_security_alert', {
      p_user_id: user.id,
      p_alert_type: 'security',
      p_severity: 'low',
      p_title: 'New Account Created',
      p_description: `New ${accountType} account "${accountName}" was created successfully.`
    })

    return new Response(
      JSON.stringify({
        success: true,
        account: {
          id: account.id,
          accountType: account.account_type,
          accountName: account.account_name,
          accountNumber: account.account_number,
          balance: account.balance,
          creditLimit: account.credit_limit,
          interestRate: account.interest_rate,
          status: account.status
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error creating account:', error)
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