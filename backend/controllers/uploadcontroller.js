import Graduate from "../models/graduateModels.js";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";

// Ensure BatchList directory exists
const ensureBatchListDirectoryExists = () => {
  const batchListDir = path.join(process.cwd(), "BatchList");

  if (!fs.existsSync(batchListDir)) {
    console.log("Creating BatchList directory for CSV uploads");
    fs.mkdirSync(batchListDir, { recursive: true });
  }
};

export const uploadCSV = async (req, res) => {
  try {
    ensureBatchListDirectoryExists();
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    console.log("File received:", req.file);
    
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (row) => {
        console.log("Parsed CSV row:", row);

        const graduate = {
          lastName: row["Last Name"] ? row["Last Name"].trim() : "Unknown",
          firstName: row["First Name"] ? row["First Name"].trim() : "Unknown",
          middleName: row["Middle Initial"] ? row["Middle Initial"].trim() : "N/A",
          contact: row["Contact No."] ? row["Contact No."].trim() : "N/A",
          email: row["Email"] ? row["Email"].trim() : "N/A",
          course: row["Course"] ? row["Course"].trim() : "Unknown",
          gradYear: row["Year Graduated"] && !isNaN(row["Year Graduated"])
            ? parseInt(row["Year Graduated"])
            : null,
        };

        // Validate gradYear before pushing
        if (!graduate.gradYear || isNaN(graduate.gradYear)) {
          console.warn(`Skipping row due to invalid graduation year:`, row);
          return;
        }

        results.push(graduate);
      })
      .on("end", async () => {
        try {
          console.log("CSV parsing complete, preparing to insert data");
          
          if (results.length === 0) {
            console.warn("No valid graduates found to insert.");
            return res.status(400).json({ error: "No valid graduates found." });
          }

          await Graduate.insertMany(results);
          console.log(`Inserted ${results.length} records successfully`);

          // Delete file after processing
          fs.unlinkSync(req.file.path);

          res.json({
            message: "Upload successful",
            count: results.length,
            data: results,
          });
        } catch (err) {
          console.error("Error inserting data into MongoDB:", err);
          res.status(500).json({
            error: "Error inserting data into MongoDB",
            details: err.message,
          });
        }
      })
      .on("error", (error) => {
        console.error("Error parsing CSV:", error);
        res.status(500).json({ error: "Error parsing CSV file", details: error.message });
      });
  } catch (err) {
    console.error("Unexpected error in upload:", err);
    res.status(500).json({ error: "Server error during upload", details: err.message });
  }
};

// Get all graduates
export const getGraduates = async (req, res) => {
  try {
    const graduates = await Graduate.find().sort({ gradYear: -1 });
    res.json(graduates);
  } catch (err) {
    console.error("Error retrieving graduates:", err);
    res.status(500).json({ error: "Error retrieving data", details: err.message });
  }
};
