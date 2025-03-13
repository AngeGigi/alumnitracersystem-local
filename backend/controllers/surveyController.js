import Survey from "../models/surveyModels/Survey.js";
import Question from "../models/surveyModels/Questions.js";
import Response from "../models/surveyModels/Response.js";

// Create a new survey
export const createSurvey = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    // Create the survey document
    const newSurvey = new Survey({ title, description });
    await newSurvey.save();

    // Create questions and link them to the survey
    const questionDocs = questions.map(q => ({
      surveyId: newSurvey._id,
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.options || []
    }));

    await Question.insertMany(questionDocs);

    res.status(201).json({ message: "Survey created successfully!", survey: newSurvey });
  } catch (error) {
    res.status(500).json({ error: "Error creating survey", details: error });
  }
};

// Get all surveys
export const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving surveys" });
  }
};

// Get a single survey by ID
export const getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    const questions = await Question.find({ surveyId: survey._id });
    res.status(200).json({ survey, questions });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving survey" });
  }
};

// Submit a response to a survey
export const submitResponse = async (req, res) => {
  try {
    const { answers } = req.body;
    const surveyId = req.params.id;

    const response = new Response({
      surveyId,
      answers
    });

    await response.save();
    res.status(201).json({ message: "Response submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting response" });
  }
};

// Delete a survey
export const deleteSurvey = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete survey and associated questions
    await Question.deleteMany({ surveyId: id });
    await Survey.findByIdAndDelete(id);

    res.status(200).json({ message: "Survey deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting survey" });
  }
};
