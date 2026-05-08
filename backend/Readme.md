# HN Reader — MERN Stack App

A full-stack web application built with MongoDB, Express, React, and Node.js that scrapes and displays Hacker News stories with authentication and bookmarking.

## Features
- 🔍 Auto-scrapes top 10 HN stories on server start
- 🔐 JWT-based authentication (register/login)
- 🔖 Bookmark stories (protected route)
- 📄 Pagination support
- 🚀 Clean REST API With Redis Cache

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