import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6'>
      <div className='relative max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/60 overflow-hidden'>
        <div className='absolute -top-12 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl' />
        <div className='absolute -bottom-12 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl' />

        <div className='relative z-10 text-center'>
          <div className='mx-auto w-16 h-16 rounded-2xl bg-linear-to-tr from-purple-400 to-indigo-500 text-white flex items-center justify-center mb-6 shadow-lg'>
            <Search size={28} />
          </div>
          <p className='text-sm font-semibold uppercase tracking-wider text-indigo-500 mb-2'>
            404 Error
          </p>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-800 mb-4'>
            Page not found
          </h1>
          <p className='text-gray-600 mb-8 leading-relaxed'>
            The page you're looking for doesn't exist or has been moved. Let's
            get you back to the blog.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-colors'
            >
              <Home size={18} /> Back to Home
            </Link>
            <Link
              to='/'
              className='inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-600 font-semibold border border-indigo-100 hover:bg-indigo-50 transition-colors'
            >
              Browse Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
