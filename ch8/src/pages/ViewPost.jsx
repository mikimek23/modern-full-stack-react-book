import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPostById } from '../api/posts'
import { Post } from '../components/Post'
import { getUserInfo } from '../api/users'
export const ViewPost = ({ postId }) => {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: Boolean(postId),
  })
  const post = postQuery.data
  const userInfoQuery = useQuery({
    queryKey: ['users', post?.author],
    queryFn: () => getUserInfo(post?.author),
    enabled: Boolean(post?.author),
  })
  const userInfo = userInfoQuery.data ?? {}
  const className = 'h-fit'

  const truncate = (str, max = 160) => {
    if (!str) return str
    if (str.length > max) {
      return str.slice(0, max - 3) + '...'
    } else {
      return str
    }
  }
  const title = post ? post.title + ' | Full-Stack React Blog' : undefined
  return (
    <div className='min-h-fit'>
      {post && (
        <>
          <title>{title}</title>
          <meta name='description' content={truncate} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={post.title} />
          <meta property='og:article:published_time' content={post.createdAt} />
          <meta property='og:article:modified_time' content={post.updatedAt} />
          <meta property='og:article:author' content={userInfo.name} />
          {(post.tags ?? []).map((tag) => (
            <meta key={tag} property='og:article:tag' content={tag} />
          ))}
        </>
      )}
      {postQuery.isLoading && (
        <div className='flex items-center justify-center py-16 text-gray-500'>
          Loading post...
        </div>
      )}
      {postQuery.isError && (
        <div className='flex items-center justify-center py-16 text-red-500'>
          Unable to load this post.
        </div>
      )}
      {post && <Post post={post} className={className} />}
    </div>
  )
}
