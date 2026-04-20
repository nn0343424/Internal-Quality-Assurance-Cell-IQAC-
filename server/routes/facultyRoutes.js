const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Document = require("../models/Document");
const Research = require("../models/Research");

const storage = multer.memoryStorage();
const upload = multer({ storage });


const FacultyInfo = require("../models/FacultyInfo");
const PersonalFile = require("../models/PersonalFile");

// ✅ GET FACULTY INFO
router.get("/info", async (req, res) => {
  try {
    const facultyId = req.user?.id || req.query.facultyId;

    const data = await FacultyInfo.findOne({ faculty: facultyId });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET PERSONAL FILE
router.get("/personal", async (req, res) => {
  try {
    const facultyId = req.user?.id || req.query.facultyId;

    const data = await PersonalFile.findOne({ faculty: facultyId });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ REAL FILE UPLOAD
router.post("/new-upload-document", upload.single("file"), async (req, res) => {
  try {
    const { facultyId, department, documentType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // upload to cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
  { resource_type: "raw" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const doc = await Document.create({
      faculty: facultyId,
      department: department.trim().toUpperCase(),
      documentType,
      fileUrl: result.secure_url,
      publicId: result.public_id,
    });

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/my-documents/:facultyId", async (req, res) => {
  try {
    const docs = await Document.find({
      faculty: req.params.facultyId
    }).sort({ uploadedAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// keep research as is
router.post("/new-research", async (req, res) => {
  try {
    const data = await Research.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;