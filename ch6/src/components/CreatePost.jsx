import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createPost } from '../api/posts'
import { PostForm } from './PostForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const CreatePost = () => {
  const [data, setData] = useState({
    title: '',
    contents: '',
    tags: [],
  })
  const [token] = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/')
    },
  })
  if (!token) {
    return setTimeout(() => {
      alert('Please log in to create new posts.')
      navigate('/login')
    })
  }
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
        children={createPostMutation.isPending ? 'Creating...' : 'Create'}
      />
    </div>
  )
}
