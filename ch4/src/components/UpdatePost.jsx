import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { updatePost } from '../api/posts'
import { PostForm } from './PostForm'

export const UpdatePost = ({ post, onCancel }) => {
  const queryClient = useQueryClient()
  const [data, setData] = useState({
    title: '',
    author: '',
    contents: '',
    tags: [],
  })

  useEffect(() => {
    if (post) {
      setData({
        title: post.title || '',
        author: post.author || '',
        contents: post.contents || '',
        tags: post.tags || [],
      })
    }
  }, [post])

  const mutation = useMutation({
    mutationFn: () => updatePost(data, post._id || post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      onCancel && onCancel()
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <PostForm
      postToEdit={post}
      onCancel={onCancel}
      handleSubmit={handleSubmit}
      data={data}
      setData={setData}
      children={mutation.isPending ? 'updating...' : 'update'}
    />
  )
}
