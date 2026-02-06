import { Post } from '../db/models/post.js'
import { User } from '../db/models/users.js'
//create post
export const createPost = async (userId, { title, contents, tags }) => {
  const post = new Post({ title, author: userId, contents, tags })
  return await post.save()
}

// list post core function
const listPosts = async (
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) => {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

//list all posts
export const listAllPosts = async (options) => {
  return await listPosts({}, options)
}

//list by author
export const listPostByAuthor = async (author) => {
  const escapedAuthor = author.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const user = await User.findOne({
    name: { $regex: escapedAuthor, $options: 'i' },
  })

  return await Post.find({
    author: user._id,
  })
}

//list by tag
export const listPostByTag = async (tags, options) => {
  return await listPosts({ tags }, options)
}

//get single post
export const getPostById = async (postId) => {
  return await Post.findById(postId)
}

// update post
export const updatePost = async (userId, postId, { title, contents, tags }) => {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}

// delete post
export const deletePost = async (userId, postId) => {
  return await Post.deleteOne({ _id: postId, author: userId })
}
