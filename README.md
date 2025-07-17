# 📝 Real-Time Collaborative To-Do Board

A full-stack web application inspired by Trello — built with the MERN stack — allowing multiple users to manage tasks in real time with live sync, smart assignment, and detailed activity logging.

## 🔗 Live Demo

**Frontend**: [https://verdant-treacle-e05e18.netlify.app](https://verdant-treacle-e05e18.netlify.app)

**Backend**: Deployed on Render (connected automatically with frontend)

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Context API
- Socket.IO Client
- Custom CSS (No CSS frameworks)
- Responsive Design & Custom Animations

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Authentication
- bcrypt for Password Hashing
- Socket.IO for Real-Time Sync
- CORS, dotenv, cookie-parser

---

## 🚀 Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/Rithvik086/Assignment.git
cd Assignment

# 2. Setup Frontend
cd frontend
npm install
npm run dev

# 3. Setup Backend
cd ../backend
npm install
npm start
```

### .ENV
Make sure to create a .env file inside the backend folder with the following keys:

```bash
MongoDb_Url=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=your_backend_port (e.g., 3000)
FRONTEND_URL=https://verdant-treacle-e05e18.netlify.app
```

### Smart Assign implementation

The Smart Assign feature fetches all users and finds the one with the fewest assigned tasks. It uses a simple loop to compare each user's assignedtasks.length against a running minimum. When a user with fewer tasks is found, that user becomes the new candidate. Finally, the backend returns this user as the best one to assign a new task. This API is triggered after relevant task changes to keep assignments fair and up to date.
