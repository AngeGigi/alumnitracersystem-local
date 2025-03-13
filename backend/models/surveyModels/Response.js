import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: "Survey", required: true },
  submittedAt: { type: Date, default: Date.now },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      response: { type: String, required: true }
    }
  ]
});

export default mongoose.model("Response", responseSchema);
