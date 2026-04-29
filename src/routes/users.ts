import { Hono } from 'hono'
import { createUser, getAllUsers, getUserById } from '../services/user.service'
import { getPostsByUserId } from '../services/post.service'

export const usersRoute = new Hono()

// GET /users
usersRoute.get('/', async (c) => {
  const users = await getAllUsers()
  return c.json(users)
})

// GET /users/:id
usersRoute.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))

  if (Number.isNaN(id)) {
    return c.json({ message: 'Invalid user id' }, 400)
  }

  const user = await getUserById(id)

  if (!user) {
    return c.json({ message: 'User not found' }, 404)
  }

  return c.json(user)
})

// POST /users
usersRoute.post('/', async (c) => {
  const body = await c.req.json()
  const { name, email } = body

  if (!name || !email) {
    return c.json({ message: 'Name and email are required' }, 400)
  }

  try {
    const newUser = await createUser(name, email)
    return c.json(newUser, 201)
  } catch {
    return c.json({ message: 'Email may already exist' }, 400)
  }
})

// GET /users/:id/posts
usersRoute.get('/:id/posts', async (c) => {
  const id = Number(c.req.param('id'))

  if (Number.isNaN(id)) {
    return c.json({ message: 'Invalid user id' }, 400)
  }

  const posts = await getPostsByUserId(id)
  return c.json(posts)
})
