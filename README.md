# Beginner Modular REST API with Hono

This is a simple REST API using:

- Hono
- TypeScript
- SQLite
- Drizzle ORM

It has three entities:

- Users
- Posts
- Comments

Relationships:

- One user can have many posts
- One post belongs to one user
- One post can have many comments
- One comment belongs to one post

## 1. Install dependencies

```bash
npm install
```

## 2. Create the database tables

```bash
npm run db:push
```

## 3. Start the server

```bash
npm run dev
```

Server runs at:

```text
http://localhost:3000
```

## Test endpoints

### Create user

POST `http://localhost:3000/users`

```json
{
  "name": "Heyor",
  "email": "heyor@example.com"
}
```

### Get all users

GET `http://localhost:3000/users`

### Get one user

GET `http://localhost:3000/users/1`

### Create post

POST `http://localhost:3000/posts`

```json
{
  "title": "My first post",
  "content": "This is my first post content",
  "userId": 1
}
```

### Get all posts

GET `http://localhost:3000/posts`

### Get posts for one user

GET `http://localhost:3000/users/1/posts`

### Create comment

POST `http://localhost:3000/comments`

```json
{
  "content": "Good post",
  "postId": 1
}
```

### Get all comments

GET `http://localhost:3000/comments`

### Get comments for one post

GET `http://localhost:3000/posts/1/comments`
