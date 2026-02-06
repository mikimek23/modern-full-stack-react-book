import { Post } from '../db/models/post.js'

//create post
export const createPost = async ({ title, author, contents, tags }) => {
  const post = new Post({ title, author, contents, tags })
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

  return await Post.find({
    author: { $regex: escapedAuthor, $options: 'i' },
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
export const updatePost = async (postId, { title, author, contents, tags }) => {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, author, contents, tags } },
    { new: true },
  )
}

// delete post
export const deletePost = async (postId) => {
  return await Post.deleteOne({ _id: postId })
}
