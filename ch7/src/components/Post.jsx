import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Calendar, Clock, Edit3, Tag, Trash2 } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { deletePosts } from '../api/posts.js'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { jwtDecode } from 'jwt-decode'

export const Post = ({ post, onEdit, setTags }) => {
  const [id, setId] = useState('')
  const [token, setToken] = useAuth()
  const userId = token ? jwtDecode(token).sub : null
  const queryClient = useQueryClient()
  const deletePostMutation = useMutation({
    mutationFn: () => deletePosts(token, id),
    onSuccess: queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })
  const userNameQueery = useQuery({
    queryKey: ['users', post.author],
    queryFn: () => getUserInfo(post.author),
  })
  const userInfo = userNameQueery.data ?? {}
  const author = userInfo.name ?? id
  const navigate = useNavigate()
  return (
    <div className='group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40 hover:-translate-y-1 overflow-hidden'>
      {/* Decorative Blob */}
      <div className='absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all' />

      {/* Tags */}
      <div className='flex flex-wrap gap-2 mb-4 relative z-10'>
        {post.tags
          ? post.tags.map((tag, idx) => (
              <span
                key={idx}
                onClick={() => setTags(tag)}
                className='flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 cursor-pointer'
              >
                <Tag size={10} /> {tag}
              </span>
            ))
          : ''}
      </div>

      {/* Content */}
      <h2 className='text-2xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors'>
        {post.title}
      </h2>

      <p className='text-gray-600 mb-6 line-clamp-3 leading-relaxed'>
        {post.contents}
      </p>

      {/* Meta Data */}
      <div className='flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6 border-b border-gray-100 pb-4'>
        <span className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md'>
          <Calendar size={12} /> Created:
          {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'N/A'}
        </span>
        <span className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md'>
          <Clock size={12} /> Updated:{' '}
          {post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'N/A'}
        </span>
        {/* <span className='flex items-center gap-1 ml-auto text-pink-500 font-medium'>
          <Heart size={12} className='fill-current' /> {post.likes}
        </span> */}
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-linear-to-tr from-purple-400 to-indigo-500 flex items-center justify-center text-white text-lg font-bold'>
            {author ? author.split('')[0].toUpperCase() : ''}
          </div>
          <span className='text-sm font-medium text-gray-700'>{author}</span>
        </div>
        {userId === post.author && (
          <div className='flex gap-2'>
            <button
              onClick={() => {
                onEdit(post)
                navigate('/post/edit', { state: { post } })
              }}
              className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors'
              title='Edit Post'
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={() => {
                setId(post._id)
                deletePostMutation.mutate()
              }}
              className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
              title='Delete Post'
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
Post.propTypes = {
  post: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}
