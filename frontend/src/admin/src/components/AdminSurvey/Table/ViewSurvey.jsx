import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewSurvey.module.css";

export const ViewSurvey = ({ surveyId, onBack }) => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/surveys/${surveyId}`);
      setSurvey(response.data);
    } catch (error) {
      console.error("Error fetching survey:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.viewSurvey}>
      <button className={styles.backButton} onClick={onBack}>Back</button>
      {loading ? (
        <p>Loading survey...</p>
      ) : survey ? (
        <div>
          <h2>{survey.survey.title}</h2>
          <p>{survey.survey.description}</p>
          <h3>Questions:</h3>
          <ul>
            {survey.questions.map((question, index) => (
              <li key={question._id}>
                <strong>{index + 1}. {question.questionText}</strong> ({question.questionType})
                {question.options.length > 0 && (
                  <ul>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>{option}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Survey not found.</p>
      )}
    </div>
  );
};
