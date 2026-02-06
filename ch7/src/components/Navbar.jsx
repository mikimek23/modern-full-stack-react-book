import {
  Home,
  LogIn,
  LogOut,
  PenSquare,
  Search,
  User,
  User2Icon,
  UserPlus,
} from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Profile } from './Profile.jsx'
import { jwtDecode } from 'jwt-decode'

export const Navbar = ({ author, setAuthor }) => {
  const [active, setActive] = useState('Home')
  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-indigo-500/30',
    secondary:
      'bg-white/80 text-gray-700 hover:bg-white hover:text-indigo-600 backdrop-blur-sm border border-white/20',
    danger:
      'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-red-500/30',
    ghost:
      'bg-transparent hover:bg-white/20 text-indigo-600 hover:text-white shadow-none',
  }
  const text = [
    { lable: 'Home', path: '/', icon: <Home size={20} /> },
    { lable: 'Write', path: '/post', icon: <PenSquare size={20} /> },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useAuth()
  const sub = token ? jwtDecode(token).sub : null
  return (
    <nav className='sticky top-4 z-50 mx-4 mb-8'>
      <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Left Section: App Name & Search */}
        <div className='flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto'>
          <Link to='/'>
            <h1 className='text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-white via-purple-200 to-indigo-200 cursor-pointer tracking-tight hover:opacity-80 transition-opacity'>
              Blog.
            </h1>
          </Link>

          <div className='relative group w-full sm:w-64'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search
                size={18}
                className='text-indigo-200 group-focus-within:text-white transition-colors'
              />
            </div>
            <input
              type='text'
              id='search'
              placeholder='Search stories...'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='block w-full pl-10 pr-3 py-2 border-none rounded-xl bg-black/20 text-white placeholder-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-black/30 transition-all'
            />
          </div>
        </div>

        {/* Middle Section: Navigation Buttons */}
        <div className='flex items-center gap-2'>
          {text.map((t, ind) => (
            <Link
              key={ind}
              to={t.path}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg
              ${active === t.lable ? variants['primary'] : variants['ghost']}`}
              aria-label='Home'
              onClick={() => setActive(t.lable)}
            >
              {t.icon}
              <span className='hidden sm:inline'>{t.lable}</span>
            </Link>
          ))}
        </div>

        {/* Right Section: Logo */}
        <div className='flex items-center gap-2'>
          {token ? (
            <div className='flex items-center gap-2'>
              <Link
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg ${variants['danger']}`}
                onClick={() => setToken(null)}
                aria-label='Log Out'
                title='Log Out'
              >
                <LogOut size={20} />
                <span className='hidden sm:inline'>Log out</span>
              </Link>
              <button
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg ${variants['ghost']}`}
                aria-label='Profile'
                title='Profile'
                onClick={() => setIsOpen(!isOpen)}
              >
                <User2Icon size={20} />
              </button>
            </div>
          ) : (
            <div className='flex'>
              <Link
                to='/login'
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg ${variants['primary']}`}
                aria-label='Log In'
                title='Log In'
              >
                <LogIn size={20} />
                <span className='hidden sm:inline'>Log In</span>
              </Link>
            </div>
          )}
          {isOpen && (
            <div className='fixed right-0 top-18'>
              <Profile id={sub} />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
