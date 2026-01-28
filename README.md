# Queue Time

> **⚠️ This project is still in development**

Queue Time is a real-time queue management application that allows users to create and manage queues with live updates.

## Features

- User authentication (login/register) for admins
- No authentication for users for ease of use 
- Create and manage multiple queues
- Add items to queues
- Real-time queue updates via WebSocket
- Admin interface for queue management
- Notifications for users on their position in the queue via Websocket and background service

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with Prisma ORM
- Socket.io for real-time communication
- JWT authentication
- Swagger API documentation

### Frontend
- React with TypeScript
- Vite
- Tailwind CSS
- Socket.io Client
- React Router
- Zustand for state management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd queue-time
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables

Create a `.env` file in the `backend` directory according to the .env.example file

5. Run database migrations
```bash
cd backend
npx prisma migrate dev
```

6. Start the backend server
```bash
cd backend
npm start
```

The backend will run on `http://localhost:8000`

7. Start the frontend development server
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure

```
queue-time/
├── backend/          # Express API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── middlewares/
│   └── prisma/       # Database schema and migrations
└── frontend/         # React application
    └── src/
        ├── components/
        ├── hooks/
        ├── pages/
        └── services/
```

## API Documentation

Once the backend server is running, API documentation is available at:
- Swagger UI: `http://localhost:8000/api-docs`
