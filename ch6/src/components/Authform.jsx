import { X } from 'lucide-react'
import { Button } from './Button'
import { Link, useNavigate } from 'react-router-dom'

export const Authform = ({
  label,
  data,
  handleSubmit,
  setData,
  children,
  disabled,
  login,
}) => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-linear-to-br from-[#2d3d8b] via-[#411d3e] to-[#886423] font-sans text-gray-900 selection:bg-indigo-500 selection:text-white pb-20'>
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px]' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/30 rounded-full blur-[120px]' />
      </div>
      <div className='relative top-0 p-4'></div>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 m-4'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-300 to-purple-300'>
              {login ? 'Log In' : 'Sign Up'}
            </h2>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <X size={24} className='text-gray-400' />
            </button>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {label.map((lab, ind) => {
              let inputType = 'text'
              if (lab.toLowerCase().includes('password')) inputType = 'password'
              if (lab.toLowerCase().includes('email')) inputType = 'email'
              return (
                <div key={ind}>
                  <label className='block text-sm font-semibold text-white/90 mb-2'>
                    {lab[0].toUpperCase() + lab.slice(1)}
                  </label>
                  <input
                    type={inputType}
                    required
                    id={lab}
                    className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50 focus:bg-white'
                    // placeholder='Enter a captivating title...'
                    value={data[lab.toLowerCase()]}
                    onChange={(e) =>
                      setData({ ...data, [lab]: e.target.value })
                    }
                  />
                </div>
              )
            })}
            <div className='flex items-center justify-end gap-3 pt-4'>
              <Link to={login ? '/signup' : '/login'}>
                <span className=' cursor-pointer bg-transparent border hover:bg-indigo-200 text-indigo-600 hover:text-indigo-400 shadow-none p-2 rounded-lg'>
                  {login ? 'Sign Up' : 'Log In'}
                </span>
              </Link>
              <Button
                type='submit'
                variant='primary'
                disabled={disabled}
                className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              >
                {children}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
