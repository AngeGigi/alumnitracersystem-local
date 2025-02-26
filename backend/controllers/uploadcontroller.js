import Graduate from "../models/graduateModels.js";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";

// Make sure BatchList directory exists
const ensureBatchListDirectoryExists = () => {
  const batchListDir = path.join(process.cwd(), 'BatchList');
  
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
    
    // Create a read stream for the uploaded file
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (data) => {
        console.log("Parsed CSV row:", data);
        results.push(data);
      })
      .on("end", async () => {
        try {
          console.log("CSV parsing complete, preparing to insert data");
          
          // Map CSV data to MongoDB schema
          const graduatesData = results.map((row) => ({
            name: row.Name,
            contact: row.Contact,
            email: row.Email,
            college: row.College,
            program: row.Program,
            year_graduated: isNaN(parseInt(row.YearGraduated)) ? null : parseInt(row.YearGraduated),
          }));
          
          console.log("Mapped data:", graduatesData);
          
          // Insert data into MongoDB
          await Graduate.insertMany(graduatesData);
          
          // Delete file after processing
          fs.unlinkSync(req.file.path);
          
          res.json({ 
            message: "Upload successful", 
            count: graduatesData.length,
            data: graduatesData 
          });
        } catch (err) {
          console.error("Error in CSV processing:", err);
          res.status(500).json({ 
            error: "Error inserting data into MongoDB", 
            details: err.message 
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
    const graduates = await Graduate.find().sort({ year_graduated: -1 });
    res.json(graduates);
  } catch (err) {
    console.error("Error retrieving graduates:", err);
    res.status(500).json({ error: "Error retrieving data", details: err.message });
  }
};