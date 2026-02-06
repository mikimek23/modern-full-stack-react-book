import { Tag, X } from 'lucide-react'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

export const PostForm = ({
  postToEdit,
  handleSubmit,
  data,
  setData,
  children,
}) => {
  const navigate = useNavigate()
  return (
    <div className='max-w-2xl mx-auto'>
      <div className='bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600'>
            {postToEdit ? 'Edit Story' : 'New Story'}
          </h2>
          <button
            onClick={() => navigate('/')}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X size={24} className='text-gray-400' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-semibold text-gray-700 mb-2'
            >
              Title
            </label>
            <input
              type='text'
              required
              id='title'
              className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50 focus:bg-white'
              placeholder='Enter a captivating title...'
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor='content'
              className='block text-sm font-semibold text-gray-700 mb-2'
            >
              Content
            </label>
            <textarea
              required
              rows={8}
              id='content'
              className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50 focus:bg-white resize-none'
              placeholder='Start writing your masterpiece...'
              value={data.contents}
              onChange={(e) => setData({ ...data, contents: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor='tag'
              className='block text-sm font-semibold text-gray-700 mb-2'
            >
              Tags (comma separated)
            </label>
            <div className='relative'>
              <Tag
                className='absolute top-3.5 left-4 text-gray-400'
                size={16}
              />
              <input
                type='text'
                id='tag'
                className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50 focus:bg-white'
                placeholder='Tech, Life, React...'
                value={data.tags}
                onChange={(e) =>
                  setData({ ...data, tags: e.target.value.split(',') })
                }
              />
            </div>
          </div>

          <div className='flex items-center justify-end gap-3 pt-4'>
            <Button
              type='button'
              variant='ghost'
              onClick={() => navigate('/')}
              className='text-gray-500! hover:bg-gray-100!'
            >
              Cancel
            </Button>
            <Button type='submit' variant='primary'>
              {children}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
