import express from "express";
import { createSurvey, getSurveys, getSurveyById, submitResponse, deleteSurvey } from "../controllers/surveyController.js";

const router = express.Router();

// Create a new survey
router.post("/create", createSurvey);

// Get all surveys
router.get("/", getSurveys);

// Get a single survey by ID
router.get("/:id", getSurveyById);

// Delete a survey
router.delete("/:id", deleteSurvey);

// Submit a response to a survey
router.post("/:id/response", submitResponse);

export default router;
