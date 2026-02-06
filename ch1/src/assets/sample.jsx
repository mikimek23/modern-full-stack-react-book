import React, { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Home,
  PenSquare,
  User,
  Trash2,
  Edit3,
  Calendar,
  Clock,
  Tag,
  ArrowUp,
  ArrowDown,
  Feather,
  X,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Heart,
} from 'lucide-react'

/**
 * MOCK DATA
 * Initial set of blog posts to populate the view.
 */
const INITIAL_POSTS = [
  {
    id: 1,
    title: 'The Future of React Server Components',
    content:
      'React Server Components are changing the way we think about data fetching and rendering. By moving logic to the server, we reduce bundle size...',
    tags: ['React', 'Tech', 'Frontend'],
    createdAt: new Date('2025-10-15T10:00:00'),
    updatedAt: new Date('2025-10-16T14:30:00'),
    author: 'Alex Dev',
    likes: 42,
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS Gradients',
    content:
      'Gradients can add depth and dimension to your UI. In this guide, we explore how to create complex, multi-stop gradients using utility classes...',
    tags: ['Design', 'CSS', 'Tailwind'],
    createdAt: new Date('2025-11-01T09:15:00'),
    updatedAt: new Date('2025-11-01T09:15:00'),
    author: 'Sarah Design',
    likes: 128,
  },
  {
    id: 3,
    title: 'Why TypeScript is Essential in 2026',
    content:
      "Type safety isn't just a luxury anymore; it's a necessity for scalable applications. Let's dive into the new features of TS 6.0...",
    tags: ['TypeScript', 'Code', 'Opinion'],
    createdAt: new Date('2025-09-20T16:45:00'),
    updatedAt: new Date('2025-10-05T11:20:00'),
    author: 'Mike Types',
    likes: 89,
  },
]

// --- COMPONENTS ---

/**
 * Button Component
 * a reusable, styled button component.
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyle =
    'px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg'
  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-indigo-500/30',
    secondary:
      'bg-white/80 text-gray-700 hover:bg-white hover:text-indigo-600 backdrop-blur-sm border border-white/20',
    danger:
      'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-red-500/30',
    ghost:
      'bg-transparent hover:bg-white/20 text-indigo-100 hover:text-white shadow-none',
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Navbar Component
 * Features logo on right, search, and navigation.
 */
const Navbar = ({ onViewChange, searchQuery, setSearchQuery, currentView }) => {
  return (
    <nav className='sticky top-4 z-50 mx-4 mb-8'>
      <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Left Section: App Name & Search */}
        <div className='flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto'>
          <h1
            onClick={() => onViewChange('home')}
            className='text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200 cursor-pointer tracking-tight hover:opacity-80 transition-opacity'
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className='hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-xl shadow-lg transform rotate-3 hover:rotate-6 transition-transform cursor-pointer'>
          <Feather size={28} className='text-white' />
        </div>
      </div>
    </nav>
  )
}

/**
 * FilterBar Component
 * Controls for sorting logic.
 */
const FilterBar = ({ sortConfig, setSortConfig }) => {
  return (
    <div className='flex flex-wrap items-center justify-end gap-4 mb-6 px-4'>
      <span className='text-indigo-100 font-medium text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm'>
        Sort By:
      </span>

      <div className='flex bg-black/20 backdrop-blur-md rounded-xl p-1 border border-white/10'>
        <button
          onClick={() => setSortConfig({ ...sortConfig, key: 'createdAt' })}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${sortConfig.key === 'createdAt' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-200 hover:text-white'}`}
        >
          Date Created
        </button>
        <button
          onClick={() => setSortConfig({ ...sortConfig, key: 'updatedAt' })}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${sortConfig.key === 'updatedAt' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-200 hover:text-white'}`}
        >
          Last Updated
        </button>
      </div>

      <button
        onClick={() =>
          setSortConfig({
            ...sortConfig,
            direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
          })
        }
        className='p-2 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-xl text-indigo-100 border border-white/10 transition-colors'
        title='Toggle Direction'
      >
        {sortConfig.direction === 'asc' ? (
          <ArrowUp size={18} />
        ) : (
          <ArrowDown size={18} />
        )}
      </button>
    </div>
  )
}

/**
 * PostCard Component
 * Displays individual post details.
 */
const PostCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className='group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40 hover:-translate-y-1 overflow-hidden'>
      {/* Decorative Blob */}
      <div className='absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all' />

      {/* Tags */}
      <div className='flex flex-wrap gap-2 mb-4 relative z-10'>
        {post.tags.map((tag, idx) => (
          <span
            key={idx}
            className='flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100'
          >
            <Tag size={10} /> {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <h2 className='text-2xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors'>
        {post.title}
      </h2>

      <p className='text-gray-600 mb-6 line-clamp-3 leading-relaxed'>
        {post.content}
      </p>

      {/* Meta Data */}
      <div className='flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6 border-b border-gray-100 pb-4'>
        <span className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md'>
          <Calendar size={12} /> Created: {post.createdAt.toLocaleDateString()}
        </span>
        <span className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md'>
          <Clock size={12} /> Updated: {post.updatedAt.toLocaleDateString()}
        </span>
        <span className='flex items-center gap-1 ml-auto text-pink-500 font-medium'>
          <Heart size={12} className='fill-current' /> {post.likes}
        </span>
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold'>
            {post.author.charAt(0)}
          </div>
          <span className='text-sm font-medium text-gray-700'>
            {post.author}
          </span>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => onEdit(post)}
            className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors'
            title='Edit Post'
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
            title='Delete Post'
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * PostEditor Component
 * Form for creating and editing posts.
 */
const PostEditor = ({ postToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  })

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        title: postToEdit.title,
        content: postToEdit.content,
        tags: postToEdit.tags.join(', '),
      })
    }
  }, [postToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((t) => t !== '')
    onSave({
      ...formData,
      tags: tagsArray,
    })
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'>
            {postToEdit ? 'Edit Story' : 'New Story'}
          </h2>
          <button
            onClick={onCancel}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X size={24} className='text-gray-400' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Title
            </label>
            <input
              type='text'
              required
              className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50 focus:bg-white'
              placeholder='Enter a captivating title...'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Tags (comma separated)
            </label>
            <div className='relative'>
              <Tag
                className='absolute top-3.5 left-4 text-gray-400'
                size={16}
              />
              <input
                type='text'
                className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50 focus:bg-white'
                placeholder='Tech, Life, React...'
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Content
            </label>
            <textarea
              required
              rows={8}
              className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50 focus:bg-white resize-none'
              placeholder='Start writing your masterpiece...'
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          <div className='flex items-center justify-end gap-3 pt-4'>
            <Button
              type='button'
              variant='ghost'
              onClick={onCancel}
              className='!text-gray-500 hover:!bg-gray-100'
            >
              Cancel
            </Button>
            <Button type='submit' variant='primary'>
              {postToEdit ? 'Update Story' : 'Publish Story'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * ProfileView Component
 * Simple placeholder profile.
 */
const ProfileView = () => (
  <div className='max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center border border-white/50 relative overflow-hidden'>
    <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600' />

    <div className='relative z-10 -mt-12 mb-6'>
      <div className='w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden'>
        <User size={48} className='text-gray-400' />
      </div>
    </div>

    <h2 className='text-2xl font-bold text-gray-800'>Guest User</h2>
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
)

// --- MAIN APP COMPONENT ---

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [view, setView] = useState('home') // 'home' | 'create' | 'edit' | 'profile'
  const [editingId, setEditingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc',
  })

  // --- Handlers ---

  const handleCreate = (data) => {
    const newPost = {
      id: Date.now(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: 'Guest User',
      likes: 0,
    }
    setPosts([newPost, ...posts])
    setView('home')
  }

  const handleUpdate = (data) => {
    setPosts(
      posts.map((p) =>
        p.id === editingId ? { ...p, ...data, updatedAt: new Date() } : p,
      ),
    )
    setEditingId(null)
    setView('home')
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      setPosts(posts.filter((p) => p.id !== id))
    }
  }

  const startEdit = (post) => {
    setEditingId(post.id)
    setView('edit')
  }

  // --- Computed Data ---

  const filteredAndSortedPosts = useMemo(() => {
    // 1. Filter
    let result = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    )

    // 2. Sort
    result.sort((a, b) => {
      const dateA = new Date(a[sortConfig.key])
      const dateB = new Date(b[sortConfig.key])
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA
    })

    return result
  }, [posts, searchQuery, sortConfig])

  const postToEdit = useMemo(
    () => posts.find((p) => p.id === editingId),
    [posts, editingId],
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70] font-sans text-gray-900 selection:bg-indigo-500 selection:text-white pb-20'>
      {/* Decorative Background Elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px]' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/30 rounded-full blur-[120px]' />
      </div>

      <div className='relative z-10 max-w-5xl mx-auto pt-6'>
        <Navbar
          onViewChange={setView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentView={view}
        />

        <main className='px-4'>
          {view === 'home' && (
            <>
              <div className='flex flex-col md:flex-row justify-between items-end mb-6'>
                <div className='mb-4 md:mb-0 text-white'>
                  <h2 className='text-4xl font-black tracking-tight mb-2'>
                    Trending Stories
                  </h2>
                  <p className='opacity-90 font-medium'>
                    Discover the latest thoughts and ideas.
                  </p>
                </div>
                <FilterBar
                  sortConfig={sortConfig}
                  setSortConfig={setSortConfig}
                />
              </div>

              {filteredAndSortedPosts.length === 0 ? (
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
              )}
            </>
          )}

          {view === 'create' && (
            <PostEditor
              onSave={handleCreate}
              onCancel={() => setView('home')}
            />
          )}

          {view === 'edit' && postToEdit && (
            <PostEditor
              postToEdit={postToEdit}
              onSave={handleUpdate}
              onCancel={() => {
                setEditingId(null)
                setView('home')
              }}
            />
          )}

          {view === 'profile' && <ProfileView />}
        </main>
      </div>
    </div>
  )
}
