import { Home, MSquareIcon, PenSquare, Search, User } from 'lucide-react'
import React from 'react'
import { Button } from './Button'

export const Navbar = ({ onViewChange, author, setAuthor, currentView }) => {
  return (
    <nav className='sticky top-4 z-50 mx-4 mb-8'>
      <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Left Section: App Name & Search */}
        <div className='flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto'>
          <h1
            onClick={() => onViewChange('home')}
            className='text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-white via-purple-200 to-indigo-200 cursor-pointer tracking-tight hover:opacity-80 transition-opacity'
          >
            Blog.
          </h1>

          <div className='relative group w-full sm:w-64'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search
                size={18}
                className='text-indigo-200 group-focus-within:text-white transition-colors'
              />
            </div>
            <input
              type='text'
              placeholder='Search stories...'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='block w-full pl-10 pr-3 py-2 border-none rounded-xl bg-black/20 text-white placeholder-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-black/30 transition-all'
            />
          </div>
        </div>

        {/* Middle Section: Navigation Buttons */}
        <div className='flex items-center gap-2'>
          <Button
            variant={currentView === 'home' ? 'primary' : 'ghost'}
            onClick={() => onViewChange('home')}
            aria-label='Home'
          >
            <Home size={20} />
            <span className='hidden sm:inline'>Home</span>
          </Button>

          <Button
            variant={currentView === 'create' ? 'primary' : 'ghost'}
            onClick={() => onViewChange('create')}
            aria-label='Create Post'
          >
            <PenSquare size={20} />
            <span className='hidden sm:inline'>Write</span>
          </Button>

          <Button
            variant={currentView === 'profile' ? 'primary' : 'ghost'}
            onClick={() => onViewChange('profile')}
            aria-label='Profile'
          >
            <User size={20} />
          </Button>
        </div>

        {/* Right Section: Logo */}
        <div className='hidden md:flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-xl shadow-lg transform rotate-3 hover:rotate-6 transition-transform cursor-pointer'>
          <MSquareIcon size={28} className='text-white' />
        </div>
      </div>
    </nav>
  )
}
