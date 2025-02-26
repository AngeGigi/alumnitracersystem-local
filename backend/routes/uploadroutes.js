import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadCSV, getGraduates } from "../controllers/uploadcontroller.js";

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'BatchList');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const router = express.Router();

// Configure multer with error handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.csv');
  }
});

// Add file filter to ensure only CSV files are uploaded
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and XLSX files are allowed"), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  }
});

// Wrap the multer middleware to catch errors
const uploadMiddleware = (req, res, next) => {
  upload.single('csvFile')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      console.error("Multer error:", err);
      return res.status(400).json({ 
        error: "File upload error", 
        details: err.message 
      });
    } else if (err) {
      // An unknown error occurred
      console.error("Unknown upload error:", err);
      return res.status(400).json({ 
        error: "File upload failed", 
        details: err.message 
      });
    }
    // Everything went fine
    next();
  });
};

// Fixed route handlers with better error handling
router.post("/BatchList", uploadMiddleware, uploadCSV);
router.get("/graduates", getGraduates);

export default router;