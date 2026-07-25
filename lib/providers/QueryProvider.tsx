// app/providers/QueryProvider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, type ReactNode } from 'react'

// ✅ Query Client Configuration with proper types
const defaultQueryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data stale hone ka time
      gcTime: 10 * 60 * 1000, // 10 minutes - garbage collection time
      refetchOnWindowFocus: false, // window focus par refetch na ho
      refetchOnMount: true, // component mount par refetch ho
      refetchOnReconnect: true, // internet reconnect par refetch ho
      retry: 2, // failure par 2 retry
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // exponential backoff
      refetchInterval: false as const, // ✅ false as const - automatic refetch interval
      refetchIntervalInBackground: false, // background mein refetch na ho
      suspense: false, // suspense mode off
      enabled: true, // query enabled by default
    },
    mutations: {
      retry: 1, // mutation failure par 1 retry
    },
  },
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient(defaultQueryClientOptions)
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* ✅ React Query DevTools - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}