import {
  createPost,
  listAllPosts,
  listPostByAuthor,
  listPostByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js'

export const newPost = async (req, res) => {
  const { title, author, contents, tags } = req.body
  if (!title) return res.status(400).json({ error: 'title is required!' })
  try {
    const post = { title, author, contents, tags }
    const result = await createPost(post)
    return res.status(201).json(result)
  } catch (error) {
    console.error('something goes wrong. try again!', error)
    return res.status(500).end()
  }
}
export const getAllPosts = async (req, res) => {
  const { sortBy, sortOrder, author, tags } = req.query
  const options = { sortBy, sortOrder }

  try {
    if (author && tags) {
      return res
        .status(400)
        .json({ error: 'query by either author or tag, nor both' })
    } else if (author) {
      const result = await listPostByAuthor(author, options)
      if (!result) {
        return res.status(400).json({ error: 'no post avalible yet.' })
      }
      return res.status(200).json(result)
    } else if (tags) {
      const result = await listPostByTag(tags, options)
      if (!result) {
        return res.status(400).json({ error: 'no post avalible yet!' })
      }
      return res.status(200).json(result)
    } else {
      const result = await listAllPosts(options)
      if (!result) return res.status(400).json({ error: 'invalid query!' })
      return res.status(200).json(result)
    }
  } catch (error) {
    console.error({ error: 'some thing goes wrong. try again!' }, error.message)
    return res.status(500).end()
  }
}
export const getById = async (req, res) => {
  const { postId } = req.params
  try {
    const result = await getPostById(postId)
    // if (!result) return res.status(400).json({ error: 'invalid parameter' })
    if (result === null)
      return res.status(404).json({ message: 'post not found' })
    return res.status(200).json(result)
  } catch (error) {
    console.error({ error: 'some thing goes wrong. try again!' }, error.message)
    return res.status(500).end()
  }
}
export const updatePosts = async (req, res) => {
  const { title, author, contents, tags } = req.body
  const { postId } = req.params
  try {
    const post = { title, author, contents, tags }
    const result = await updatePost(postId, post)
    if (!result) return res.status(400).json({ error: 'invalid input' })
    return res.status(201).json(result)
  } catch (error) {
    console.error({ error: 'some thing goes wrong. try again!' }, error.message)
    return res.status(500).end()
  }
}
export const deletePosts = async (req, res) => {
  const { postId } = req.params
  try {
    const result = await deletePost(postId)
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'post not found!' })
    }
    return res.status(200).json({ message: 'post deleted', id: postId })
  } catch (error) {
    console.error({ error: 'some thing goes wrong. try again!' }, error.message)
    return res.status(500).end()
  }
}
