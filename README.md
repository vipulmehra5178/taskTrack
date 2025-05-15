🧠 MERN Task Tracker
A full-stack Task Tracker application built with MongoDB, Express, React, and Node.js. Authenticated users can:

✅ Sign up & log in

📁 Create multiple projects

✅ Inside each project, create, update, and delete tasks

root/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── utils/api.js
│   └── App.jsx
└── README.md


🧪 Usage Flow
1.Sign up/Login
   
    Get your JWT token and userId.

2.Create a Project

    Use /api/project/:userId/createProject.

3.Inside that Project

    Use /api/tasks/:userId/:projectId/createTask to add tasks.

4.Manage Tasks

    Update: /api/tasks/:userId/:projectId/:taskId

     Delete: /api/tasks/:userId/:projectId/:taskId


📦 Tech Stack

Frontend: React, Vite, Tailwind CSS

Backend: Express.js, Node.js

Database: MongoDB 

Auth: JWT

Hosting: Render.com


⚙️ Setup Instructions

💻 Frontend

    cd frontend

    npm install

    npm run dev

    Set .env:

    VITE_API_BASE_URL=https://your-backend-url/api

