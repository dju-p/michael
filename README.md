# MongoDB Backend with Prisma ORM

A fully-featured backend implementation using MongoDB, Node.js, Express, and Prisma ORM.

## Features

- MongoDB database with Prisma ORM
- User and Semester models with relationships
- Complete CRUD operations for all models
- RESTful API endpoints
- Data validation and error handling
- Environment variable configuration

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```
DATABASE_URL="mongodb://localhost:27017/university_db"
PORT=3000
```

Replace the MongoDB connection string with your own if needed.

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Seed the database (optional):

```bash
node prisma/seed.js
```

## Usage

Start the development server:

```bash
npm run dev
```

Or start the production server:

```bash
npm start
```

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `POST /api/users/:userId/semesters/:semesterId` - Add a semester to a user
- `DELETE /api/users/:userId/semesters/:semesterId` - Remove a semester from a user

### Semesters

- `GET /api/semesters` - Get all semesters
- `GET /api/semesters/:id` - Get a semester by ID
- `POST /api/semesters` - Create a new semester
- `PUT /api/semesters/:id` - Update a semester
- `DELETE /api/semesters/:id` - Delete a semester
- `GET /api/semesters/:id/users` - Get all users for a semester

## User Schema

```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "age": "number",
  "role": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Semester Schema

```json
{
  "id": "string",
  "name": "string",
  "year": "number",
  "term": "string",
  "startDate": "date",
  "endDate": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```