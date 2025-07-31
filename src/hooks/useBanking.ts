import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getDashboardData, 
  getUserAccounts, 
  getAccountTransactions,
  getUserTransfers,
  getSecurityAlerts,
  createAccount,
  processTransfer,
  markAlertAsResolved
} from '@/lib/supabase'
import { useAuth } from './useAuth'

export const useDashboardData = () => {
  const { isAuthenticated } = useAuth()
  
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
    enabled: isAuthenticated,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

export const useAccounts = () => {
  const { isAuthenticated } = useAuth()
  
  return useQuery({
    queryKey: ['accounts'],
    queryFn: getUserAccounts,
    enabled: isAuthenticated,
  })
}

export const useAccountTransactions = (accountId: string) => {
  const { isAuthenticated } = useAuth()
  
  return useQuery({
    queryKey: ['transactions', accountId],
    queryFn: () => getAccountTransactions(accountId),
    enabled: isAuthenticated && !!accountId,
  })
}

export const useTransfers = () => {
  const { isAuthenticated } = useAuth()
  
  return useQuery({
    queryKey: ['transfers'],
    queryFn: getUserTransfers,
    enabled: isAuthenticated,
  })
}

export const useSecurityAlerts = (resolved = false) => {
  const { isAuthenticated } = useAuth()
  
  return useQuery({
    queryKey: ['security-alerts', resolved],
    queryFn: () => getSecurityAlerts(resolved),
    enabled: isAuthenticated,
  })
}

export const useCreateAccount = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      // Invalidate and refetch accounts and dashboard data
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useProcessTransfer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: processTransfer,
    onSuccess: () => {
      // Invalidate and refetch related data
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['transfers'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useResolveAlert = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: markAlertAsResolved,
    onSuccess: () => {
      // Invalidate and refetch security alerts
      queryClient.invalidateQueries({ queryKey: ['security-alerts'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}