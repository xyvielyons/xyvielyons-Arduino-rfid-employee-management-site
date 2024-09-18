'use client'

import {NextUIProvider} from '@nextui-org/react'
import { QueryClientProvider, QueryClient } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'


const queryClient = new QueryClient();

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      {children}
    </NextUIProvider>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  )
}