import bcrypt from 'bcrypt'
import { User } from '../db/models/users.js'
import jwt from 'jsonwebtoken'

export const createUser = async ({ name, email, password }) => {
  const findUser = await User.findOne({ email })
  if (findUser) {
    throw new Error('user already exist!')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ name, email, password: hashedPassword })
  const savedUser = await user.save()
  return savedUser
}
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('user_dont_exist')
  }
  const verifyPassword = await bcrypt.compare(password, user.password)
  if (!verifyPassword) {
    throw new Error('invalid_password')
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
  return token
}
export const getUser = async (userId) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new Error('user_dont_exist')
  }
  return user
}
