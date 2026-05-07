<div align="center">

<img src="https://img.icons8.com/fluency/96/server.png" alt="Server Icon" width="80" />

<h1>⚙️ GYM ENGINE — SERVER</h1>

> **Robust REST API Backend for the Gym Engine Platform**

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>
<p>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/bcryptjs-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white" />
  <img src="https://img.shields.io/badge/Morgan-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
  <img src="https://img.shields.io/badge/CORS-00B4D8?style=for-the-badge" />
</p>

<p>
  <img src="https://img.shields.io/badge/version-1.0.0-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/license-ISC-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/ts--node--dev-enabled-blueviolet?style=flat-square" />
</p>

**Base URL:** `https://gym-engine-server.vercel.app/api/v1`

</div>

---

## 📖 Overview

The **Gym Engine Server** is a fully typed, production-ready REST API built with **Express 5** and **TypeScript**. It powers all platform operations — authentication, user management, class scheduling, bookings, and role-based access control — for the Gym Engine frontend.

---

## 🗂️ Project Structure

```
gym-engine-server/
│
├── index.ts                  # Entry point — bootstraps app & DB connection
│
├── src/
│   ├── config/
│   │   └── db.ts             # MongoDB connection setup
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── class.controller.ts
│   │   ├── schedule.controller.ts
│   │   └── booking.controller.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── class.model.ts
│   │   ├── schedule.model.ts
│   │   └── booking.model.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── class.routes.ts
│   │   ├── schedule.routes.ts
│   │   └── booking.routes.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts  # JWT verification
│   │   ├── role.middleware.ts  # RBAC enforcement
│   │   └── error.middleware.ts # Global error handler
│   │
│   └── utils/
│       ├── generateToken.ts
│       └── responseHelper.ts
│
├── dist/                      # Compiled JS output (auto-generated)
├── .env                       # Environment variables
├── tsconfig.json
└── package.json
```

---

## 📦 Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.2.1 | HTTP server & routing framework |
| `mongodb` | ^7.2.0 | MongoDB driver for database ops |
| `jsonwebtoken` | ^9.0.3 | JWT creation & verification |
| `bcryptjs` | ^3.0.3 | Password hashing & comparison |
| `cors` | ^2.8.6 | Cross-Origin Resource Sharing |
| `cookie-parser` | ^1.4.7 | Parse cookies from requests |
| `dotenv` | ^17.4.2 | Load environment variables |
| `morgan` | ^1.10.1 | HTTP request logger |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^6.0.3 | Type-safe JavaScript superset |
| `ts-node-dev` | ^2.0.0 | Dev server with hot reload |
| `@types/express` | ^5.0.6 | Express type definitions |
| `@types/node` | ^25.6.0 | Node.js type definitions |
| `@types/jsonwebtoken` | ^9.0.10 | JWT type definitions |
| `@types/bcryptjs` | ^2.4.6 | bcryptjs type definitions |
| `@types/cors` | ^2.8.19 | CORS type definitions |
| `@types/morgan` | ^1.9.10 | Morgan type definitions |
| `@types/cookie-parser` | ^1.4.10 | Cookie-parser type definitions |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (Atlas or local)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/tuhin360/gym-engine-server.git
cd gym-engine-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/gym-engine

# Auth
JWT_SECRET=your_super_secret_jwt_key

# Frontend
FRONTEND_URL=http://localhost:3000
```

### 4. Run the Server

```bash
# Development (hot reload via ts-node-dev)
npm run dev

# Production (compile → run)
npm start
```

> Server starts at `http://localhost:5000`

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `ts-node-dev --respawn --transpile-only index.ts` | Dev server with hot reload |
| `start` | `tsc && node dist/index.js` | Compile TypeScript then run |
| `test` | _(not yet configured)_ | Test runner placeholder |

---

## 🌐 API Endpoints

### 🔐 Auth Routes — `/api/v1/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login & receive JWT |
| `POST` | `/logout` | Auth | Invalidate session |
| `GET` | `/me` | Auth | Get current user profile |

### 👤 User Routes — `/api/v1/users`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Admin | Get all users |
| `GET` | `/:id` | Admin/Self | Get user by ID |
| `PATCH` | `/:id` | Admin/Self | Update user details |
| `DELETE` | `/:id` | Admin | Delete a user |
| `PATCH` | `/:id/role` | Admin | Update user role |

### 🏋️ Class Routes — `/api/v1/classes`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get all classes |
| `GET` | `/:id` | Public | Get class by ID |
| `POST` | `/` | Admin/Trainer | Create new class |
| `PATCH` | `/:id` | Admin/Trainer | Update class |
| `DELETE` | `/:id` | Admin | Delete class |

### 📅 Schedule Routes — `/api/v1/schedules`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get all schedules |
| `POST` | `/` | Admin/Trainer | Create schedule slot |
| `PATCH` | `/:id` | Admin/Trainer | Update schedule |
| `DELETE` | `/:id` | Admin | Delete schedule |

### 📋 Booking Routes — `/api/v1/bookings`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Admin | Get all bookings |
| `GET` | `/my` | Member | Get own bookings |
| `POST` | `/` | Member | Create a booking |
| `DELETE` | `/:id` | Member/Admin | Cancel a booking |

---

## 🔐 Authentication Flow

```
Client                        Server
  │                              │
  │─── POST /auth/login ────────▶│
  │         { email, password }  │
  │                              │── bcryptjs.compare()
  │                              │── JWT sign (role + id)
  │◀── { token, user } ─────────│
  │                              │
  │─── GET /protected ──────────▶│
  │     Authorization: Bearer    │── verifyToken middleware
  │                              │── checkRole middleware
  │◀── { protected data } ──────│
```

---

## 🛡️ Middleware Stack

```
Request
   │
   ▼
morgan()          → Logs method, URL, status, response time
cors()            → Validates origin against FRONTEND_URL
express.json()    → Parses JSON request bodies
cookieParser()    → Parses cookies (refresh tokens etc.)
   │
   ▼
Route Handler
   │
   ▼
authMiddleware    → Verifies JWT from Authorization header
roleMiddleware    → Enforces role-based access (Admin / Trainer / Member)
   │
   ▼
Controller Logic
   │
   ▼
errorMiddleware   → Catches thrown errors, formats JSON error response
```

---

## 🗄️ Data Models

### User
```typescript
{
  _id:        ObjectId,
  name:       string,
  email:      string,       // unique
  password:   string,       // bcrypt hashed
  role:       "admin" | "trainer" | "member" | "non-member",
  createdAt:  Date,
  updatedAt:  Date
}
```

### Class
```typescript
{
  _id:         ObjectId,
  title:       string,
  description: string,
  category:    "basic" | "yoga" | "bodybuilding" | "muscle",
  trainer:     ObjectId,    // ref → User
  capacity:    number,
  createdAt:   Date
}
```

### Schedule
```typescript
{
  _id:       ObjectId,
  class:     ObjectId,      // ref → Class
  trainer:   ObjectId,      // ref → User
  date:      Date,
  startTime: string,
  endTime:   string,
  slots:     number
}
```

### Booking
```typescript
{
  _id:       ObjectId,
  user:      ObjectId,      // ref → User
  schedule:  ObjectId,      // ref → Schedule
  status:    "confirmed" | "cancelled",
  bookedAt:  Date
}
```

---

## ⚙️ TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./",
    "skipLibCheck": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 🔒 Security Practices

- ✅ Passwords hashed with **bcryptjs** (salt rounds: 10+)
- ✅ Auth via short-lived **JWT tokens**
- ✅ Role enforcement on every protected route
- ✅ CORS restricted to known frontend origin
- ✅ Environment secrets loaded via **dotenv** (never committed)
- ✅ All inputs validated before database operations

---

## 🚀 Deployment

The server is deployed on **Vercel** using serverless functions.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Make sure all environment variables from `.env` are added to your Vercel project settings.

---

## 🗺️ Roadmap

- [x] JWT authentication & role-based access
- [x] Class & schedule management APIs
- [x] Booking system
- [x] Morgan logging
- [ ] 🔔 WebSocket notifications (Socket.io)
- [ ] 💬 Trainer–Member messaging API
- [ ] 📊 Advanced analytics endpoints
- [ ] ✅ Jest unit & integration tests
- [ ] 🐳 Dockerize for local dev
- [ ] 🔁 Refresh token rotation

---

## 👨‍💻 Author

<div align="center">

<img src="https://avatars.githubusercontent.com/tuhin360" width="72" style="border-radius:50%" alt="Jahedi Alam Tuhin" />

### Jahedi Alam Tuhin

[![GitHub](https://img.shields.io/badge/GitHub-tuhin360-181717?style=for-the-badge&logo=github)](https://github.com/tuhin360)

</div>

---

<div align="center">

⭐ **Star this repo** if it helped you — it keeps the project alive!

Made with ❤️ by **Jahedi Alam Tuhin**

</div>