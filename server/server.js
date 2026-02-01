const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/auditor", require("./routes/auditorRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/survey", require("./routes/surveyRoutes"));
app.use("/api/public", require("./routes/publicRoutes"));
app.use("/api/semester-audit", require("./routes/semesterAuditRoutes"));






app.get("/", (req, res) => {
  res.send("IQAC Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
