import mongoose from "mongoose";

const GraduateSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  college: String,
  program: String,
  year_graduated: Number,
});

const Graduate = mongoose.model("Graduate", GraduateSchema);

export default Graduate; // ✅ Ensure it's exported properly
