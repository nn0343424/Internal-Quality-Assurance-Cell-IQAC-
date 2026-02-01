const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const SemesterAudit = require("../models/SemesterAudit");


router.get(
  "/status/:facultyId",
  auth,
  async (req, res) => {
    if (!["auditor", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const odd = await SemesterAudit.findOne({
      facultyId: req.params.facultyId,
      semesterType: "ODD"
    });

    const even = await SemesterAudit.findOne({
      facultyId: req.params.facultyId,
      semesterType: "EVEN"
    });

   

    res.json({
      oddSubmitted: Boolean(odd),
      evenSubmitted: Boolean(even)
    });
  }
);


router.post("/", auth, role("faculty"), async (req, res) => {
  const { semesterType, academicYear, ...data } = req.body;

  const audit = await SemesterAudit.findOneAndUpdate(
    {
      facultyId: req.user.id,
      semesterType,
      academicYear
    },
    {
      facultyId: req.user.id,
      semesterType,
      academicYear,
      ...data
    },
    { upsert: true, new: true }
  );

  res.json(audit);
});


router.get("/:semesterType/:academicYear", auth, async (req, res) => {
  const audit = await SemesterAudit.findOne({
    facultyId: req.user.id,
    semesterType: req.params.semesterType,
    academicYear: req.params.academicYear
  });

  res.json(audit);
});


router.get(
  "/faculty/:facultyId/:semesterType/:academicYear",
  auth,
  async (req, res) => {
    if (!["auditor", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const audit = await SemesterAudit.findOne({
      facultyId: req.params.facultyId,
      semesterType: req.params.semesterType,
      academicYear: req.params.academicYear
    });

    res.json(audit);
  }
);

module.exports = router;
