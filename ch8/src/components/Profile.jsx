import { User } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Button } from './Button'
import { getUserInfo } from '../api/users.js'
import PropTypes from 'prop-types'

export const Profile = ({ id }) => {
  const userInfoQuery = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })
  const userInfo = userInfoQuery.data ?? {}
  return (
    <div>
      <title>Profile |Full-Stack React Blog</title>
      <div className='max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center border border-white/50 relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600' />

        <div className='relative z-10 -mt-1 mb-6'>
          <div className='w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden'>
            <User size={48} className='text-gray-400' />
          </div>
        </div>

        <h2 className='text-2xl font-bold text-gray-800'>
          {userInfo.name ?? id}
        </h2>
        <p className='text-gray-500 mb-6'>Passionate Writer & Reader</p>

        <div className='grid grid-cols-3 gap-4 mb-8'>
          <div className='p-3 bg-indigo-50 rounded-xl'>
            <div className='font-bold text-indigo-600 text-xl'>12</div>
            <div className='text-xs text-gray-500 uppercase tracking-wide'>
              Posts
            </div>
          </div>
          <div className='p-3 bg-pink-50 rounded-xl'>
            <div className='font-bold text-pink-600 text-xl'>1.5k</div>
            <div className='text-xs text-gray-500 uppercase tracking-wide'>
              Likes
            </div>
          </div>
          <div className='p-3 bg-purple-50 rounded-xl'>
            <div className='font-bold text-purple-600 text-xl'>342</div>
            <div className='text-xs text-gray-500 uppercase tracking-wide'>
              Following
            </div>
          </div>
        </div>

        <Button className='w-full justify-center'>Edit Profile</Button>
      </div>
    </div>
  )
}
Profile.propType = {
  id: PropTypes.string.isRequired,
}
