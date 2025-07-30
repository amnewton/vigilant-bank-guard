import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock functions for demo purposes until Supabase is configured
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    // Demo credentials
    if (email === 'newton' && password === '1234567') {
      return { success: true, user: { email } }
    }
    throw new Error('Invalid credentials')
  },
  
  signUp: async (email: string, password: string) => {
    return { success: true, user: { email } }
  },
  
  resetPassword: async (email: string) => {
    return { success: true }
  }
}

export const mockData = {
  getAccounts: async () => [
    { id: 1, name: 'Checking Account', balance: 2450.75, type: 'checking' },
    { id: 2, name: 'Savings Account', balance: 15680.50, type: 'savings' },
    { id: 3, name: 'Investment Account', balance: 45320.25, type: 'investment' }
  ],
  
  getTransactions: async () => [
    { id: 1, date: '2024-01-15', description: 'Salary Deposit', amount: 5000, type: 'deposit' },
    { id: 2, date: '2024-01-14', description: 'Grocery Store', amount: -125.50, type: 'withdrawal' },
    { id: 3, date: '2024-01-13', description: 'ATM Withdrawal', amount: -200, type: 'withdrawal' }
  ],
  
  getAlerts: async () => [
    { 
      id: 1, 
      type: 'security', 
      severity: 'high', 
      message: 'Multiple failed login attempts detected',
      timestamp: '2024-01-15 14:30:00',
      resolved: false
    },
    {
      id: 2,
      type: 'suspicious',
      severity: 'medium', 
      message: 'Unusual transaction pattern detected',
      timestamp: '2024-01-15 12:15:00',
      resolved: false
    }
  ]
}