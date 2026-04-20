// ============================================================
// PASTE THIS INTO YOUR BACKEND: routes/semesterAudit.js
// (or wherever your semester audit routes file lives)
// ============================================================

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const SemesterAudit = require("../models/SemesterAudit");

// ✅ FIX: Single /status/:facultyId route — NO role restriction
// Faculty themselves call this to check if they submitted
router.get("/status/:facultyId", async (req, res) => {
  try {
    const audit = await SemesterAudit.findOne({
      facultyId: req.params.facultyId,
    });

    console.log("STATUS CHECK for", req.params.facultyId, "→", audit ? "FOUND" : "NOT FOUND");

    res.json({
      submitted: !!audit, // true if any audit record exists for this faculty
    });
  } catch (err) {
    console.error("Status check error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Submit / Update audit
router.post("/", async (req, res) => {
  try {
    const { semester, academicYear, facultyId, ...data } = req.body;

    if (!semester || !facultyId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const audit = await SemesterAudit.findOneAndUpdate(
      {
        facultyId,
        semester,
        academicYear,
      },
      {
        facultyId,
        semester,
        academicYear,
        ...data,
      },
      { upsert: true, new: true }
    );

    res.json(audit);
  } catch (err) {
    console.error("AUDIT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get audit by semesterType + academicYear (for faculty)
router.get("/:semesterType/:academicYear", auth, async (req, res) => {
  try {
    const audit = await SemesterAudit.findOne({
      facultyId: req.user.id,
      semesterType: req.params.semesterType,
      academicYear: req.params.academicYear,
    });
    res.json(audit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get audit for auditor/admin viewing a specific faculty
router.get("/faculty/:facultyId/:semesterType/:academicYear", auth, async (req, res) => {
  try {
    if (!["auditor", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const audit = await SemesterAudit.findOne({
      facultyId: req.params.facultyId,
      semesterType: req.params.semesterType,
      academicYear: req.params.academicYear,
    });

    res.json(audit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
