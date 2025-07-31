import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Profile error:', profileError)
    }

    // Get user accounts
    const { data: accounts, error: accountsError } = await supabaseClient
      .from('accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (accountsError) {
      throw new Error(`Failed to fetch accounts: ${accountsError.message}`)
    }

    // Get recent transactions (last 10)
    const accountIds = accounts?.map(acc => acc.id) || []
    const { data: transactions, error: transactionsError } = await supabaseClient
      .from('transactions')
      .select(`
        *,
        accounts!inner(account_name, account_type)
      `)
      .in('account_id', accountIds)
      .order('created_at', { ascending: false })
      .limit(10)

    if (transactionsError) {
      throw new Error(`Failed to fetch transactions: ${transactionsError.message}`)
    }

    // Get security alerts (last 5 unresolved)
    const { data: securityAlerts, error: alertsError } = await supabaseClient
      .from('security_alerts')
      .select('*')
      .eq('user_id', user.id)
      .eq('resolved', false)
      .order('created_at', { ascending: false })
      .limit(5)

    if (alertsError) {
      throw new Error(`Failed to fetch security alerts: ${alertsError.message}`)
    }

    // Calculate totals
    const totalAssets = accounts?.reduce((sum, acc) => {
      if (acc.account_type === 'credit') {
        return sum // Don't include credit card balances in assets
      }
      return sum + parseFloat(acc.balance || 0)
    }, 0) || 0

    const totalDebt = accounts?.reduce((sum, acc) => {
      if (acc.account_type === 'credit' && parseFloat(acc.balance || 0) < 0) {
        return sum + Math.abs(parseFloat(acc.balance || 0))
      }
      return sum
    }, 0) || 0

    // Get monthly spending (current month)
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { data: monthlyTransactions, error: monthlyError } = await supabaseClient
      .from('transactions')
      .select('amount')
      .in('account_id', accountIds)
      .eq('transaction_type', 'debit')
      .gte('created_at', startOfMonth.toISOString())

    if (monthlyError) {
      console.error('Monthly transactions error:', monthlyError)
    }

    const monthlySpending = monthlyTransactions?.reduce((sum, txn) => 
      sum + parseFloat(txn.amount || 0), 0) || 0

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          profile: profile || {
            first_name: user.user_metadata?.first_name || 'User',
            last_name: user.user_metadata?.last_name || '',
          },
          accounts: accounts || [],
          recentTransactions: transactions || [],
          securityAlerts: securityAlerts || [],
          summary: {
            totalAssets: totalAssets,
            totalDebt: totalDebt,
            monthlySpending: monthlySpending,
            accountCount: accounts?.length || 0
          }
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
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