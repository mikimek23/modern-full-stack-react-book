import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { updatePost } from '../api/posts'
import { PostForm } from './PostForm'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const UpdatePost = ({ post }) => {
  const queryClient = useQueryClient()
  const [data, setData] = useState({
    title: '',
    author: '',
    contents: '',
    tags: [],
  })
  const navigate = useNavigate()
  const [token] = useAuth()
  const { postId } = useParams()
  const location = useLocation()
  const locationPost = location.state?.post
  console.log(post)

  // try to find the active post from props, navigation state, or cached posts
  const cachedPosts = queryClient.getQueryData(['posts']) ?? []
  const foundPost = cachedPosts.find(
    (p) =>
      p._id === postId ||
      p.id === postId ||
      p._id === locationPost?._id ||
      p.id === locationPost?.id,
  )
  const activePost = post || locationPost || foundPost

  useEffect(() => {
    if (activePost) {
      setData({
        title: activePost.title || '',
        author: activePost.author || '',
        contents: activePost.contents || '',
        tags: activePost.tags || [],
      })
    }
  }, [post, locationPost, foundPost])

  const mutation = useMutation({
    mutationFn: () => {
      const id = activePost?._id || activePost?.id
      return updatePost(token, data, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/')
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <PostForm
      postToEdit={activePost}
      handleSubmit={handleSubmit}
      data={data}
      setData={setData}
      children={mutation.isPending ? 'updating...' : 'update'}
    />
  )
}
