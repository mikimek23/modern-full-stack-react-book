import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext'
import PropTypes from 'prop-types'

const queryClient = new QueryClient()
export const App = ({ children }) => {
  return (
    <div className='min-h-screen bg-linear-to-br from-[#2d3d8b] via-[#411d3e] to-[#886423] font-sans text-gray-900 selection:bg-indigo-500 selection:text-white pb-20'>
      {/* Decorative Background Elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px]' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/30 rounded-full blur-[120px]' />
      </div>
      <div className='relative p-4'></div>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </QueryClientProvider>
    </div>
  )
}
App.proptype = {
  children: PropTypes.element.isRequired,
}
