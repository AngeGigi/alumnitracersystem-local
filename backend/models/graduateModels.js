import mongoose from "mongoose";

const GraduateListSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  college: { type: String },
  course: { type: String, required: true }, // ✅ Matches "Program" field in CSV
  gradYear: { type: Number, required: true }, // ✅ Correct type (Number)
});

export default mongoose.model("Graduate", GraduateListSchema);
