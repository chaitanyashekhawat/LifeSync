# LifeSync

A simple MERN full-stack project for managing tasks and goals, using Prisma ORM.

## Prerequisites

- Node.js
- MongoDB Atlas Account

## Setup

### Backend

1. Navigate to `lifesync-backend`:
   ```bash
   cd lifesync-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your MongoDB connection string as `DATABASE_URL` and JWT Secret.
   ```
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/lifesync?retryWrites=true&w=majority"
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
5. Start the server:
   ```bash
   npm start
   ```
   (or `node server.js`)

### Frontend

1. Navigate to `lifesync-frontend`:
   ```bash
   cd lifesync-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- User Authentication (Signup/Login) with JWT
- Dashboard with Task Management (CRUD, Search, Filter, Pagination)
- Goals Management
- Simple Profile View
- Prisma ORM with MongoDB

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Auth**: JWT with bcryptjs
