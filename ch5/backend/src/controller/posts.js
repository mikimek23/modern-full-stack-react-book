import { Post } from '../db/models/post.js'
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
export const insertMany = async (req, res) => {
  const posts = [
    {
      title: 'Understanding JavaScript Closures',
      author: 'Miki',
      contents:
        'JavaScript closures allow a function to remember and access variables from its lexical scope, even when the function is executed outside that scope. This behavior is fundamental to how JavaScript handles variable access and scope chaining.\n\nClosures are commonly used for data encapsulation, private variables, callbacks, and higher-order functions. Understanding closures helps developers write more predictable and maintainable code.',
      tags: ['javascript', 'closures', 'programming', 'web'],
    },
    {
      title: 'Getting Started with MongoDB',
      author: 'Alex Johnson',
      contents:
        'MongoDB is a NoSQL database that stores data as flexible, JSON-like documents. Unlike relational databases, it does not require a fixed schema, making it easier to evolve applications over time.\n\nIt is widely used in modern web development due to its scalability, performance, and tight integration with JavaScript-based stacks like MERN.',
      tags: ['mongodb', 'database', 'nosql', 'backend'],
    },
    {
      title: 'Why Learn Data Structures',
      author: 'Sarah Kim',
      contents:
        'Data structures provide ways to organize and store data efficiently. Choosing the right data structure can significantly improve the performance of an application.\n\nFor software engineers, mastering data structures is essential for solving complex problems, optimizing algorithms, and succeeding in technical interviews.',
      tags: ['data-structures', 'algorithms', 'computer-science'],
    },
    {
      title: 'REST APIs Explained',
      author: 'Daniel Perez',
      contents:
        'REST APIs define a set of rules that enable communication between clients and servers using HTTP. They rely on stateless requests and standard methods such as GET and POST.\n\nWell-designed REST APIs are predictable, scalable, and easy to consume, making them a popular choice for web and mobile applications.',
      tags: ['api', 'rest', 'backend', 'http'],
    },
    {
      title: 'Async Programming in JavaScript',
      author: 'Miki',
      contents:
        'Asynchronous programming allows JavaScript to perform long-running tasks without blocking the main execution thread. This is crucial for responsive applications.\n\nTechniques such as promises and async/await make asynchronous code easier to read and maintain compared to traditional callback-based approaches.',
      tags: ['javascript', 'async', 'promises'],
    },
    {
      title: 'Introduction to Git and GitHub',
      author: 'Emily Stone',
      contents:
        'Git is a distributed version control system that tracks changes in source code over time. It allows developers to collaborate without overwriting each other’s work.\n\nGitHub builds on Git by providing hosting, collaboration tools, and workflows that simplify team-based software development.',
      tags: ['git', 'github', 'version-control'],
    },
    {
      title: 'What Is Big-O Notation?',
      author: 'Michael Brown',
      contents:
        'Big-O notation is used to describe how an algorithm’s performance changes as the input size grows. It focuses on worst-case scenarios.\n\nUnderstanding Big-O helps developers compare algorithms and make informed decisions when optimizing performance.',
      tags: ['algorithms', 'big-o', 'performance'],
    },
    {
      title: 'Building Your First Node.js Server',
      author: 'Chris Lee',
      contents:
        'Node.js allows JavaScript to run outside the browser, enabling server-side development. It uses an event-driven, non-blocking architecture.\n\nBy combining Node.js with frameworks like Express, developers can quickly build scalable APIs and web servers.',
      tags: ['nodejs', 'express', 'backend'],
    },
    {
      title: 'SQL vs NoSQL Databases',
      author: 'Anna Müller',
      contents:
        'SQL databases store data in structured tables with predefined schemas and relationships. They are ideal for complex queries and transactions.\n\nNoSQL databases trade rigid structure for flexibility and scalability, making them suitable for large-scale and rapidly changing applications.',
      tags: ['sql', 'nosql', 'databases'],
    },
    {
      title: 'Common JavaScript Array Methods',
      author: 'Miki',
      contents:
        'JavaScript provides powerful array methods such as map, filter, and reduce. These methods promote a functional programming style.\n\nUsing array methods leads to cleaner, more expressive code and reduces the need for explicit loops.',
      tags: ['javascript', 'arrays', 'functional-programming'],
    },
    {
      title: 'Introduction to TypeScript',
      author: 'Robert Wilson',
      contents:
        'TypeScript extends JavaScript by adding static typing. This helps catch errors during development rather than at runtime.\n\nMany large-scale applications adopt TypeScript to improve maintainability, readability, and developer confidence.',
      tags: ['typescript', 'javascript', 'typing'],
    },
    {
      title: 'Web Security Basics',
      author: 'Laura Chen',
      contents:
        'Web security focuses on protecting applications from malicious attacks such as XSS, CSRF, and SQL injection.\n\nBy implementing authentication, authorization, and secure communication, developers can significantly reduce security risks.',
      tags: ['security', 'web', 'authentication'],
    },
    {
      title: 'CSS Flexbox in Practice',
      author: 'James Carter',
      contents:
        'Flexbox is a one-dimensional layout system that simplifies alignment and spacing in CSS layouts.\n\nIt is especially useful for responsive design, allowing elements to adapt smoothly to different screen sizes.',
      tags: ['css', 'flexbox', 'frontend'],
    },
    {
      title: 'Introduction to Testing in JavaScript',
      author: 'Sophia Martinez',
      contents:
        'Testing ensures that software behaves as expected and prevents regressions. Automated tests save time in the long run.\n\nJavaScript ecosystems offer popular testing frameworks like Jest and Mocha to support unit and integration testing.',
      tags: ['testing', 'javascript', 'quality'],
    },
    {
      title: 'Problem Solving for Software Engineers',
      author: 'Miki',
      contents:
        'Problem solving is a core skill for software engineers and involves logical thinking and structured analysis.\n\nBreaking problems into smaller parts and applying known patterns helps engineers design efficient and reliable solutions.',
      tags: ['problem-solving', 'software-engineering', 'logic'],
    },
  ]
  try {
    await Post.insertMany(posts)
    res.status(200).json({ message: 'success' })
  } catch (error) {
    console.log(error.message)
  }
}
