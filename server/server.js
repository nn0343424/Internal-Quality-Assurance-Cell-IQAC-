const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DB
require("./config/db");
// DB
const connectDB = require("./config/db");
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const auditorRoutes = require("./routes/auditorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const semesterAuditRoutes = require("./routes/semesterAuditRoutes");

app.use("/api/public", require("./routes/adminRoutes"));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/auditor", auditorRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/semester-audit", semesterAuditRoutes);

app.use("/api/notifications", require("./routes/notificationRoutes"));
const PORT = 5000;

app.listen(PORT, () => console.log("Server running on port", PORT));