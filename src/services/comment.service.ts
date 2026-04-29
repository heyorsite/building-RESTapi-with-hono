import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { comments, posts } from '../db/schema'

export async function createComment(content: string, postId: number) {
  // First check if the post exists
  const foundPost = await db
    .select()
    .from(posts)
    .where(eq(posts.id, postId))

  if (!foundPost[0]) {
    throw new Error('POST_NOT_FOUND')
  }

  const result = await db
    .insert(comments)
    .values({ content, postId })
    .returning()

  return result[0]
}

export async function getAllComments() {
  return db.select().from(comments)
}

export async function getCommentsByPostId(postId: number) {
  return db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
}
