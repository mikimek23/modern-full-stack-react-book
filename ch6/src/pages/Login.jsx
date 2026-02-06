import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { login } from '../api/users'
import { useNavigate } from 'react-router-dom'
import { Authform } from '../components/Authform'
import { useAuth } from '../contexts/AuthContext'

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  //const [isAuth, setIsAuth] = useState(false)
  const Label = ['email', 'password']
  const [, setToken] = useAuth()
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: () => login(data),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('failed to log in!'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }
  return (
    <Authform
      label={Label}
      data={data}
      handleSubmit={handleSubmit}
      setData={setData}
      children={loginMutation.isPending ? 'Log In...' : 'Log In'}
      login={true}
      disabled={!data.email || !data.password || loginMutation.isPending}
    />
  )
}
