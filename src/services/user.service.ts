import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { users } from '../db/schema'

export async function createUser(name: string, email: string) {
  const result = await db
    .insert(users)
    .values({ name, email })
    .returning()

  return result[0]
}

export async function getAllUsers() {
  return db.select().from(users)
}

export async function getUserById(id: number) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))

  return result[0]
}
