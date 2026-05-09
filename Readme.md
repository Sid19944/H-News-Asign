# HN Reader — MERN Stack App

A full-stack web application built with MongoDB, Express, React, and Node.js that scrapes and displays Hacker News stories with authentication and bookmarking.

## Features
- 🔍 Auto-scrapes top 10 HN stories on server start
- 🔐 JWT-based authentication (register/login)
- 🔖 Bookmark stories (protected route)
- 📄 Pagination support
- 🚀 Clean REST API With Redis Cache
- Resis for fast result
- Boneyard Skeleton for better user interface till the data load

# Routes
- Auth :
    - /api/auth/register
    - /api/auth/login
    - /api/auth/get-user (#Protected)
    - /api/auth/logout (#Protected)

- Scrape :
    - /api/scrape (get the top 10 story)

- Story :
    - /api/stories?page=1&limit=10 (get 10 stories)
    - /api/stories/bookmarks  (#Protected)
    - /api/stories/:id
    - /api/stories/:id/bookmarks  (#Protected, Toggle bookmark)



## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend
```bash
cd backend
npm install
# create .env (see below)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Environment Variables

### backend/.env