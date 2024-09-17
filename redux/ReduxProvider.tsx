'use client'
//redux is a client component
import { store } from './store'
import React from 'react'
//import The provider and store
import { Provider } from 'react-redux'
export default function ReduxProvider({children}:{children:React.ReactNode}) {
  return (

   <Provider store={store}>
    {children}

   </Provider>
  
  )
}