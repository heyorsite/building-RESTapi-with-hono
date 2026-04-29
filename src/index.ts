import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { usersRoute } from './routes/users'
import { postsRoute } from './routes/posts'
import { commentsRoute } from './routes/comments'

const app = new Hono()

// Home route
app.get('/', (c) => {
  return c.text('Modular REST API with Hono is running')
})

// Modular routes
app.route('/users', usersRoute)
app.route('/posts', postsRoute)
app.route('/comments', commentsRoute)

serve(
  {
    fetch: app.fetch,
    port: 3000
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
