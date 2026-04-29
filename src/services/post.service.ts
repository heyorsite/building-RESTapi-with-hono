import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { posts, users } from '../db/schema'

export async function createPost(title: string, content: string, userId: number) {
  // First check if the user exists
  const foundUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))

  if (!foundUser[0]) {
    throw new Error('USER_NOT_FOUND')
  }

  const result = await db
    .insert(posts)
    .values({ title, content, userId })
    .returning()

  return result[0]
}

export async function getAllPosts() {
  return db.select().from(posts)
}

export async function getPostsByUserId(userId: number) {
  return db
    .select()
    .from(posts)
    .where(eq(posts.userId, userId))
}
