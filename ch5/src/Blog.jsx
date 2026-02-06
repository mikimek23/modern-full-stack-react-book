import { useQuery } from '@tanstack/react-query'
import { CreatePost } from './components/CreatePost'
import { UpdatePost } from './components/UpdatePost'
import { PostList } from './components/PostList'
import { PostSorting } from './components/PostSorting'
import { getPosts } from './api/posts.js'
import { useState } from 'react'
import { Navbar } from './components/Navbar.jsx'

export const Blog = () => {
  const [author, setAuthor] = useState('')
  const [tags, setTags] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const [postToEdit, setPostToEdit] = useState(null)
  const [view, setView] = useState('home') // home, edite, create

  const postsQuery = useQuery({
    queryKey: ['posts', { tags, author, sortBy, sortOrder }],
    queryFn: () => getPosts({ tags, author, sortBy, sortOrder }),
  })
  const posts = postsQuery.data ?? []
  return (
    <div className='min-h-screen bg-linear-to-br from-[#4158D0] via-[#411d3e] to-[#886423] font-sans text-gray-900 selection:bg-indigo-500 selection:text-white pb-20'>
      {/* Decorative Background Elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px]' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/30 rounded-full blur-[120px]' />
      </div>
      <Navbar
        onViewChange={setView}
        author={author}
        setAuthor={setAuthor}
        currentView={view}
      />
      <div className='max-w-4xl mx-auto px-4'>
        {view === 'home' && (
          <>
            <div className='flex flex-col md:flex-row justify-between items-end mb-6'>
              <div className='mb-4 md:mb-0 text-white'>
                <h2 className='text-4xl font-black tracking-tight mb-2'>
                  Stories
                </h2>
                <p className='opacity-90 font-medium'>
                  Discover the latest thoughts and ideas.
                </p>
              </div>
              <PostSorting
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                orderValue={sortOrder}
                onOrderChange={(orderValue) => setSortOrder(orderValue)}
              />
            </div>
            <section>
              <PostList
                posts={posts}
                onEdit={(post) => {
                  setPostToEdit(post)
                  setView('edit')
                }}
                setTags={setTags}
              />
            </section>

            {/* {filteredAndSortedPosts.length === 0 ? (
              <div className='text-center py-20 bg-white/20 backdrop-blur-md rounded-3xl border border-white/20 text-white'>
                <Feather size={48} className='mx-auto mb-4 opacity-70' />
                <h3 className='text-xl font-bold mb-2'>No posts found</h3>
                <p className='opacity-80'>
                  Try adjusting your search or write something new!
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-8 pb-12'>
                {filteredAndSortedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onEdit={startEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )} */}
          </>
        )}
        {view === 'create' && <CreatePost onCancel={() => setView('home')} />}

        {view === 'edit' && postToEdit && (
          <UpdatePost
            post={postToEdit}
            onCancel={() => {
              setPostToEdit(null)
              setView('home')
            }}
          />
        )}
      </div>
    </div>
  )
}
