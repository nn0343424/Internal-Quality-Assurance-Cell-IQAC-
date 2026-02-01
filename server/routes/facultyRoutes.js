const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const FacultyInfo = require("../models/FacultyInfo");
const OddAudit = require("../models/OddAudit");
const EvenAudit = require("../models/EvenAudit");
const PersonalFile = require("../models/PersonalFile");

const router = express.Router();



router.get("/info", auth, role("faculty"), async (req, res) => {
  const info = await FacultyInfo.findOne({ facultyId: req.user.id });
  res.json(info);
});

// UPDATE faculty info (edit profile)
router.put("/info", auth, role("faculty"), async (req, res) => {
  const updated = await FacultyInfo.findOneAndUpdate(
    { facultyId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});router.get("/info", auth, role("faculty"), async (req, res) => {
  const info = await FacultyInfo.findOne({ facultyId: req.user.id });
  res.json(info);
});

// UPDATE faculty info (edit profile)
router.put("/info", auth, role("faculty"), async (req, res) => {
  const updated = await FacultyInfo.findOneAndUpdate(
    { facultyId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});


// Faculty Info
router.post("/info", auth, role("faculty"), async (req, res) => {
  const data = await FacultyInfo.create({
    facultyId: req.user.id,
    ...req.body,
  });
  res.json(data);
});

// Odd Semester
// const upload = require("../middleware/upload");

router.post(
  "/odd",
  auth,
  role("faculty"),
  // upload.single("proof"),
  async (req, res) => {
    const data = await OddAudit.create({
      facultyId: req.user.id,
      ...req.body,
      proof: req.file?.filename,
    });
    res.json(data);
  },
);

// Even Semester
router.post("/even", auth, role("faculty"), async (req, res) => {
  const data = await EvenAudit.create({
    facultyId: req.user.id,
    ...req.body,
  });
  res.json(data);
});

// Personal File
router.post("/personal", auth, role("faculty"), async (req, res) => {
  const data = await PersonalFile.create({
    facultyId: req.user.id,
    ...req.body,
  });
  res.json(data);
});

router.get("/personal", auth, role("faculty"), async (req, res) => {
  const file = await PersonalFile.findOne({ facultyId: req.user.id });
  res.json(file);
});

// UPDATE personal file
router.put("/personal", auth, role("faculty"), async (req, res) => {
  const updated = await PersonalFile.findOneAndUpdate(
    { facultyId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});


module.exports = router;
