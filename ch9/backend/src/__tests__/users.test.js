import { beforeEach, describe, expect, test } from '@jest/globals'
import { createUser, getUser, loginUser } from '../services/user.js'
import mongoose from 'mongoose'
import { User } from '../db/models/users'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
describe(' sign up', () => {
  test('with all parameter must succed', async () => {
    const user = {
      name: 'Abebe',
      email: 'abebe@gmail.com',
      password: '1234',
    }
    const newUser = await createUser(user)
    expect(newUser._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundUser = await User.findById(newUser._id).lean()
    expect(foundUser.name).toBe(user.name)
    expect(foundUser.email).toBe(user.email)
    const isMach = await bcrypt.compare(user.password, foundUser.password)
    expect(isMach).toBe(true)
    expect(foundUser.password).not.toBe(user.password)
  })
  test('without name parameter must failed', async () => {
    const user = {
      email: 'kebede@gmail.com',
      password: '1234',
    }
    try {
      await createUser(user)
    } catch (err) {
      expect(err.name).toBe('ValidationError')
      expect(err.message).toContain('`name` is required')
    }
  })
  test(' two users with the same email must failed', async () => {
    const user1 = { name: 'abebe', email: 'aba@gamil.com', password: '1234' }
    const user2 = { name: 'kebede', email: 'aba@gamil.com', password: '1234' }
    try {
      await createUser(user1)
      await createUser(user2)
    } catch (err) {
      expect(err.name).toBe('Error')
      expect(err.message).toContain('user already exist!')
    }
  })
  test('without password parameter must failed', async () => {
    const user = { name: 'abebe', email: 'aba@gamil.com', password: '1234' }
    try {
      await createUser(user)
    } catch (err) {
      expect(err.name).toBe('Error')
    }
  })
})
let user = []
const hashedPassword = await bcrypt.hash('1234', 10)
beforeEach(async () => {
  await User.deleteMany({})
  user = []
  const newUser = await User.create({
    name: 'abebe',
    email: 'aba@gamil.com',
    password: hashedPassword,
  })
  user.push(await newUser.save())
})
describe('log in', () => {
  test('with all parameter must succed', async () => {
    const res = await loginUser({ email: 'aba@gamil.com', password: '1234' })
    expect(res).toBeDefined()
  })
  test('with incorrect email must fail', async () => {
    try {
      await loginUser({ email: 'ab@gamil.com', password: '1234' })
    } catch (err) {
      expect(err.name).toBe('Error')
      expect(err.message).toBe('user_dont_exist')
    }
  })
  test('with incorrect password must fail', async () => {
    try {
      await loginUser({ email: 'aba@gamil.com', password: '123' })
    } catch (err) {
      expect(err.name).toBe('Error')
      expect(err.message).toBe('invalid_password')
    }
  })
})
describe('get user', () => {
  test('with valid id must succed', async () => {
    const userInfo = await getUser(user[0]._id)
    expect(userInfo.name).toBe(user[0].name)
    expect(userInfo.email).toBe(user[0].email)
    expect(userInfo.password).toBe(user[0].password)
  })
  test('with invalid id must fail', async () => {
    try {
      await getUser('123456789012345678901234')
    } catch (err) {
      expect(err.name).toBe('Error')
      expect(err.message).toBe('user_dont_exist')
    }
  })
  test('with invalid id length must fail', async () => {
    try {
      await getUser('123456789098765432')
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.CastError)
      expect(err.message).toContain('Cast to ObjectId failed')
    }
  })
})
