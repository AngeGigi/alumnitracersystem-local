import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: "Survey", required: true },
  questionText: { type: String, required: true },
  questionType: { type: String, enum: ["text", "multiple-choice", "checkbox", "rating"], required: true },
  options: { type: [String], default: [] } // Only applicable for multiple-choice or checkbox
});

export default mongoose.model("Question", questionSchema);
