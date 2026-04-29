import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const client = createClient({
  url: 'file:./sqlite.db'
})

// This makes SQLite respect foreign key relationships
await client.execute('PRAGMA foreign_keys = ON')

export const db = drizzle(client, { schema })
