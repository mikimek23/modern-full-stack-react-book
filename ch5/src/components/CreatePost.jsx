import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createPost } from '../api/posts'
import { PostForm } from './PostForm'

export const CreatePost = ({ onCancel }) => {
  const [data, setData] = useState({
    title: '',
    author: '',
    contents: '',
    tags: [],
  })
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }
  return (
    <div>
      <PostForm
        handleSubmit={handleSubmit}
        data={data}
        setData={setData}
        onCancel={onCancel}
        children={createPostMutation.isPending ? 'Creating...' : 'Create'}
      />
    </div>
  )
}
