# 📝 JWT Todo API

A simple and secure RESTful Todo API built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **JWT Authentication**.

This API allows users to register and log in securely, and perform full CRUD operations on their todos — all protected with authentication and refresh token support.

---

## 🚀 Features

- ✅ User Registration & Login
- 🔐 JWT Access and Refresh Token Authentication
- 🧾 Create, Read, Update, and Delete Todos
- 🔍 Pagination, Filtering, and Search
- 🛡️ Protected Routes with Middleware
- 🧪 All endpoints tested and working

---

## 🛠️ Technologies Used

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **dotenv**
- **express-validator**
- **argon2** for password hashing

---

## 📁 Project Structure

src/
│
├── controllers/ # All controller logic (auth, todos)
├── middleware/ # Authentication middleware
├── models/ # Mongoose models
├── routes/ # API route definitions
├── types/ # Custom TypeScript types
├── utils/ # Utility functions (JWT generation, validation)
└── app.ts # Entry point


---

#🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jwt-todo-api
JWT_SECRET=your_access_token_secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_EXPIRES_IN=7d

📦 Installation & Setup
# Clone the repository
git clone https://github.com/your-username/jwt-todo-api.git
cd jwt-todo-api

# Install dependencies
npm install

# Run the server (dev)
npm run dev

# Build the app
npm run build

# Start in production mode
npm start

---

🧪 API Endpoints
Auth Routes
POST /api/auth/register – Register new user

POST /api/auth/login – Login and get tokens

POST /api/auth/refresh – Refresh access token

GET /api/auth/profile – Get user profile (Protected)

Todo Routes (Protected)
GET /api/todos – Get all todos (with pagination, filtering, search)

GET /api/todos/:id – Get a single todo

POST /api/todos – Create a todo

PUT /api/todos/:id – Update a todo

PATCH /api/todos/:id/toggle – Toggle todo status

DELETE /api/todos/:id – Delete a todo

All /api/todos/* routes require a valid access token in the Authorization header:

Authorization: Bearer <your_token_here>
