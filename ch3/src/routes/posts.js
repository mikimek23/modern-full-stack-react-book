import {
  deletePosts,
  getAllPosts,
  getById,
  newPost,
  updatePosts,
} from '../controller/posts.js'
import express from 'express'

const router = express.Router()

router.post('/posts', newPost)
router.get('/posts', getAllPosts)
router.get('/posts/:postId', getById)
router.patch('/posts/:postId', updatePosts)
router.delete('/posts/:postId', deletePosts)
export default router
