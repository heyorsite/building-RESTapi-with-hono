import { Hono } from 'hono'
import { createPost, getAllPosts } from '../services/post.service'
import { getCommentsByPostId } from '../services/comment.service'

export const postsRoute = new Hono()

// GET /posts
postsRoute.get('/', async (c) => {
  const posts = await getAllPosts()
  return c.json(posts)
})

// POST /posts
postsRoute.post('/', async (c) => {
  const body = await c.req.json()
  const { title, content, userId } = body

  if (!title || !content || !userId) {
    return c.json({ message: 'Title, content, and userId are required' }, 400)
  }

  try {
    const newPost = await createPost(title, content, Number(userId))
    return c.json(newPost, 201)
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return c.json({ message: 'User not found' }, 404)
    }

    return c.json({ message: 'Could not create post' }, 400)
  }
})

// GET /posts/:id/comments
postsRoute.get('/:id/comments', async (c) => {
  const id = Number(c.req.param('id'))

  if (Number.isNaN(id)) {
    return c.json({ message: 'Invalid post id' }, 400)
  }

  const comments = await getCommentsByPostId(id)
  return c.json(comments)
})
