import {
  deletePosts,
  getAllPosts,
  getById,
  insertMany,
  newPost,
  updatePosts,
} from '../controller/posts.js'
import express from 'express'
import { requireAuth } from '../middlewares/jwt.js'

const router = express.Router()

router.post('/posts', requireAuth, newPost)
router.get('/posts', getAllPosts)
router.get('/posts/:postId', getById)
router.patch('/posts/:postId', requireAuth, updatePosts)
router.delete('/posts/:postId', requireAuth, deletePosts)
router.get('/post/many', insertMany)
export default router
