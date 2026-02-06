import { createUser, getUser, loginUser } from '../services/user.js'

export const signUp = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'all fieds are required!', success: false })
  }
  try {
    const result = await createUser({ name, email, password })
    return res.status(201).json({
      message: 'your are sign up successfully',
      result: result,
      success: true,
    })
  } catch (err) {
    if (err.message === 'user already exist!') {
      return res
        .status(409)
        .json({ message: 'user already exist!', success: false })
    }
    return res.status(500).json({ massage: err.message, success: false })
  }
}
export const logIn = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'email and password required', success: false })
  }
  try {
    const result = await loginUser({ email, password })
    res.status(200).json({
      message: 'you are loged in your account!',
      token: result,
      success: true,
    })
  } catch (err) {
    if (
      err.message === 'user_dont_exist' ||
      err.message === 'invalid_password'
    ) {
      return res
        .status(400)
        .json({ message: 'Incorrect email or password', success: false })
    }
    return res.status(500).json({ massage: err.message, success: false })
  }
}

export const getUserById = async (req, res) => {
  const userId = req.params
  try {
    const user = await getUser(userId.id)
    res.status(200).json(user)
  } catch (err) {
    if (err.message === 'user_dont_exist') {
      return res.status(404).json({ message: 'user not found', success: false })
    }
    return res.status(500).json({ massage: err.message, success: false })
  }
}
