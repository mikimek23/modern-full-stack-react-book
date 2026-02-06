import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authform } from '../components/Authform'
import { signup } from '../api/users'

export const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const Label = ['name', 'email', 'password']

  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: () => signup(data),
    onSuccess: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }
  return (
    <Authform
      label={Label}
      data={data}
      handleSubmit={handleSubmit}
      setData={setData}
      children={signupMutation.isPending ? 'Sign Up...' : 'Sign Up'}
      disabled={
        !data.name || !data.email || !data.password || signupMutation.isPending
      }
    />
  )
}
