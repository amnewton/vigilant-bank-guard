import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Auth helper functions
export const signUp = async (email: string, password: string, userData: {
  firstName: string
  lastName: string
  phone?: string
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
      }
    }
  })

  if (error) throw error

  // Create profile record
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone || null,
      })

    if (profileError) {
      console.error('Error creating profile:', profileError)
    }
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Banking API functions
export const createAccount = async (accountData: {
  accountType: 'checking' | 'savings' | 'investment' | 'credit'
  accountName: string
  initialDeposit?: number
  creditLimit?: number
}) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/create-account`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
  })

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error)
  }

  return result.account
}

export const processTransfer = async (transferData: {
  fromAccountId: string
  toAccountId?: string
  transferType: 'internal' | 'external' | 'wire'
  amount: number
  description?: string
  recipientName?: string
  recipientEmail?: string
}) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/process-transfer`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transferData),
  })

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error)
  }

  return result.transfer
}

export const getDashboardData = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/get-dashboard-data`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error)
  }

  return result.data
}

// Database query helpers
export const getUserAccounts = async () => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getAccountTransactions = async (accountId: string, limit = 50) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('account_id', accountId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export const getUserTransfers = async (limit = 50) => {
  const { data, error } = await supabase
    .from('transfers')
    .select(`
      *,
      from_account:accounts!transfers_from_account_id_fkey(account_name, account_number),
      to_account:accounts!transfers_to_account_id_fkey(account_name, account_number)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export const getSecurityAlerts = async (resolved = false, limit = 50) => {
  const { data, error } = await supabase
    .from('security_alerts')
    .select('*')
    .eq('resolved', resolved)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export const markAlertAsResolved = async (alertId: string) => {
  const { data, error } = await supabase
    .from('security_alerts')
    .update({ resolved: true })
    .eq('id', alertId)
    .select()
    .single()

  if (error) throw error
  return data
}