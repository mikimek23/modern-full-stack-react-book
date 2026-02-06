import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { AuthContextProvider } from './contexts/AuthContext'
import { CreatePost } from './components/CreatePost'
import { Navbar } from './components/Navbar'
import { UpdatePost } from './components/UpdatePost'
import { Profile } from './components/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/post',
    element: <CreatePost />,
  },
  {
    path: '/post/edit',
    element: <UpdatePost />,
  },
  {
    path: '/user/profile',
    element: <Profile />,
  },
])
const queryClient = new QueryClient()
export const App = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-[#2d3d8b] via-[#411d3e] to-[#886423] font-sans text-gray-900 selection:bg-indigo-500 selection:text-white pb-20'>
      {/* Decorative Background Elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px]' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/30 rounded-full blur-[120px]' />
      </div>
      <div className='relative p-4'></div>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  )
}
