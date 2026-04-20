const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const User = require("../models/User");
const CourseExitSurvey = require("../models/CourseExitSurvey");
const FacultyInfo = require("../models/FacultyInfo");
const PersonalFile = require("../models/PersonalFile");
const Announcement = require("../models/Announcement");
const Timetable = require("../models/Timetable");
const AcademicCalendar = require("../models/AcademicCalendar");
const Event = require("../models/Event");
const Notification = require("../models/Notification");

  

const router = express.Router();


// Create announcement
// router.post("/announcement", async (req, res) => {
//   const data = await Announcement.create(req.body);
//   res.json(data);
// });

// Add academic calendar
router.post("/calendar", async (req, res) => {
  const data = await AcademicCalendar.create(req.body);
  res.json(data);
});

// Add event
router.post("/event", async (req, res) => {
  const data = await Event.create(req.body);
  res.json(data);
});

// Upload timetable (basic for now)
router.post("/timetable", async (req, res) => {
  const data = await Timetable.create(req.body);
  res.json(data);
});
// GET faculty & auditors
router.get("/users", auth, async (req, res) => {
  try {
    // allow both admin and auditor
    if (!["admin", "auditor"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({ role: { $ne: "admin" } });
    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 THIS ROUTE IS REQUIRED
router.get("/feedback-summary", auth, role("admin"), async (req, res) => {
  try {
    const summary = await CourseExitSurvey.aggregate([
      {
        $group: {
          _id: "$facultyId",
          responses: { $sum: 1 },
          avgClarity: { $avg: "$clarity" },
          avgSatisfaction: { $avg: "$overallSatisfaction" }
        }
      }
    ]);

    res.json(summary);
  } catch (err) {
    console.error("FEEDBACK SUMMARY ERROR:", err);
    res.status(500).json({ message: "Failed to load feedback summary" });
  }
});

router.put("/users/:id", auth, role("admin"), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        department: req.body.department,
        subject: req.body.subject
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
});

router.get("/faculty/:id/info", auth, async (req, res) => {
  if (!["admin", "auditor"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const info = await FacultyInfo.findOne({ facultyId: req.params.id });
  res.json(info);
});

router.get("/faculty/:id/personal", auth, async (req, res) => {
  if (!["admin", "auditor"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const file = await PersonalFile.findOne({ facultyId: req.params.id });
  res.json(file);
});


// ================= PHASE 1 NEW FEATURES =================

// Create Announcement
// ================= PHASE 1 NEW FEATURES =================

// Create Announcement
router.post("/new-announcement", async (req, res) => {
  try {
    const data = await Announcement.create(req.body);

    const users = await User.find({ role: { $ne: "admin" } });

    const now = new Date();
    const formatted = now.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

   const notifications = users.map((u) => ({
  userId: u._id,
  title: data.title,                  // ✅ ADD THIS
  message: data.message,              // ✅ REAL MESSAGE
  type: "announcement",               // ✅ OPTIONAL (VERY USEFUL)
}));

    await Notification.insertMany(notifications);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUBLIC FACULTY ROUTE (NO AUTH)
// ✅ PUBLIC FACULTY LIST (NO AUTH)
router.get("/faculty", async (req, res) => {
  try {
    const faculty = await User.find({ role: "faculty" })
      .select("name department");

    res.json(faculty);
  } catch (err) {
    console.error("Faculty fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});


// Events
router.post("/new-event", async (req, res) => {
  try {
    const data = await Event.create(req.body);

    const users = await User.find({ role: { $ne: "admin" } });

    const now = new Date();
    const formatted = now.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const notifications = users.map((u) => ({
      userId: u._id,
      message: `New Event: ${data.title} on ${formatted}`,
    }));

    await Notification.insertMany(notifications);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Timetable
router.post("/new-timetable", async (req, res) => {
  try {
    const data = await Timetable.create(req.body);

    const faculty = await User.find({ role: "faculty" });

    const now = new Date();
    const formatted = now.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const notifications = faculty.map((u) => ({
      userId: u._id,
      message: `New Timetable Uploaded on ${formatted}`,
    }));

    await Notification.insertMany(notifications);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Announcements
router.get("/new-announcement", async (req, res) => {
  try {
    const data = await Announcement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
