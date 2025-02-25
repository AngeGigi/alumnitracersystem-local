import express from 'express';
import mongoose from 'mongoose';
import { Student } from '../record.js'; // Import the existing Student schema
import { SurveySubmission } from './surveyroutes.js'; // Import the existing SurveySubmission schema
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = user;
    next();
  });
};

// Get all alumni (with filters and pagination)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    // Validate and sanitize query parameters
    const page = Math.max(1, parseInt(req.query.page) || 1); // Default page is 1
    const limit = Math.max(1, parseInt(req.query.limit) || 10); // Default limit is 10
    const college = req.query.college?.trim() || null;
    const course = req.query.course?.trim() || null;

    // Construct query filters
    const query = {};
    if (college) query['personalInfo.college'] = college;
    if (course) query['personalInfo.course'] = course;

    

    const surveys = await SurveySubmission.aggregate([
      { $match: query }, // Apply the filters
      {
        $lookup: {
          from: 'students', // Collection name for `Student`
          localField: 'userId',
          foreignField: '_id',
          as: 'studentInfo', // Resulting array of matched students
        },
      },
      { $unwind: '$studentInfo' }, // Flatten the joined `studentInfo` array
      { $sort: { createdAt: -1 } }, // Sort by the most recent survey
      { $skip: (page - 1) * limit }, // Pagination: Skip documents
      { $limit: limit }, // Pagination: Limit the number of documents
    ]);

    const total = await SurveySubmission.countDocuments(query); // Total matching documents

    // Map surveys to include only relevant fields for the TABLE
    const mappedSurveys = surveys.map((survey) => ({
      userId: survey.userId.toString(),
      generatedID: survey.studentInfo.generatedID,
      personalInfo: {
        first_name: survey.personalInfo.first_name,
        last_name: survey.personalInfo.last_name,
        email_address: survey.personalInfo.email_address,
        college: survey.personalInfo.college,
        course: survey.personalInfo.course,
        birthdate: survey.personalInfo.birthdate || 'N/A',
        gradyear: survey.studentInfo.gradyear,
      },
      employmentInfo: survey.employmentInfo || {},
      submittedAt: survey.createdAt,
    }));

    // Respond with data and pagination info
    res.status(200).json({
      success: true,
      data: mappedSurveys,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching surveys:', error.message);
    res.status(500).json({ error: 'Failed to fetch survey data.' });
  }
});


// Get details of a specific latestSurvey by userId
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user's latest survey submission
    const latestSurvey = await SurveySubmission.findOne(
      { userId: userId },
      {},
      { sort: { 'createdAt': -1 } }
    );

    if (!latestSurvey) {
      return res.status(404).json({ 
        success: false, 
        message: 'No survey data found' 
      });
    }
    // Fetch user details from the Student collection
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'User not found in Student collection'
      });
    }

    // Get all surveys for the completed surveys section
    const allSurveys = await SurveySubmission.find({ userId: userId })
      .sort({ createdAt: -1 });

    // Combine the data, using the latest survey for personal/employment info
    res.status(200).json({
      success: true,
      data: {
        personalInfo: { ...latestSurvey.personalInfo,birthday: student.birthday}, // Add birthday from the Student collection,
        employmentInfo:{ ...latestSurvey.employmentInfo},
        degree: latestSurvey.degree,
        course: latestSurvey.course,
        college: latestSurvey.college,
        gradyear: student.gradyear, // Assuming the field is named graduationYear in your model
        surveys: allSurveys
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile', error: error.message });
  }
});
export default router;
