# 📊 Internal Quality Assurance Cell (IQAC) Management System

A full-stack MERN application designed to streamline academic audit processes, faculty management, and institutional quality assurance workflows.

---

## 🚀 Features

### 👨‍💼 Admin
- Manage users (Faculty & Auditors)
- Create announcements, events, timetable, academic calendar
- View reports and audit summaries

### 👨‍🏫 Faculty
- Submit audit documents
- View approval/rejection notifications
- Manage personal and academic records

### 🕵️ Auditor
- Review faculty submissions
- Approve / Reject with comments
- Monitor audit activities

### 🎓 Students
- Submit Course Exit Survey (feedback system)

### 🔔 Notifications System
- Real-time alerts for:
  - Document verification
  - Announcements
  - Events & timetable updates

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication & Security
- JWT (jsonwebtoken)
- bcryptjs

### File Upload & Utilities
- Cloudinary
- Multer
- dotenv

---

## 📁 Project Structure


Internal-Quality-Assurance-Cell-IQAC-/
│
├── client/iqac # Frontend (React)
└── server # Backend (Node.js + Express)


---

# ⚙️ SETUP INSTRUCTIONS

---

## 🔹 1. Clone Repository

```bash
git clone <your-repo-link>
cd Internal-Quality-Assurance-Cell-IQAC-
🎨 FRONTEND SETUP
cd client/iqac
npm install
🔥 Install Required Dependencies
npm install axios react-router-dom react-hot-toast
▶️ Start Frontend
npm start

👉 Runs on:
http://localhost:3000

⚙️ BACKEND SETUP
cd server
npm install
🔥 Install Required Packages
npm install express mongoose cors dotenv
npm install jsonwebtoken bcryptjs
npm install cloudinary multer
🔑 Environment Variables

Create a .env file inside server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
▶️ Start Backend
node server.js

👉 Runs on:
http://localhost:5000

---

# 👨‍💼 Admin Registration (First Time Setup)

After starting the backend server, create the first admin user using Postman.

## ✅ Steps

1. Open Postman
2. Create a new request
3. Select method as `POST`
4. Enter the URL:

```http
http://localhost:5000/api/auth/register

Body → raw → JSON

{
  "name": "Admin",
  "email": "admin@iqac.com",
  "password": "admin123",
  "role": "admin"
}

Click Send

After registration, login using:

Email: admin@iqac.com
Password: admin123