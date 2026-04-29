import { Hono } from 'hono'
import { createComment, getAllComments } from '../services/comment.service'

export const commentsRoute = new Hono()

// GET /comments
commentsRoute.get('/', async (c) => {
  const comments = await getAllComments()
  return c.json(comments)
})

// POST /comments
commentsRoute.post('/', async (c) => {
  const body = await c.req.json()
  const { content, postId } = body

  if (!content || !postId) {
    return c.json({ message: 'Content and postId are required' }, 400)
  }

  try {
    const newComment = await createComment(content, Number(postId))
    return c.json(newComment, 201)
  } catch (error) {
    if (error instanceof Error && error.message === 'POST_NOT_FOUND') {
      return c.json({ message: 'Post not found' }, 404)
    }

    return c.json({ message: 'Could not create comment' }, 400)
  }
})
