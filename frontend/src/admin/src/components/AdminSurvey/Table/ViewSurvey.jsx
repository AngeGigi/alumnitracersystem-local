import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewSurvey.module.css";
import Tuplogo from "../images/Tuplogo.png";
import Alumnilogo from "../images/alumniassoc_logo.png";

export const ViewSurvey = ({ surveyId, onBack }) => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState({}); // Store selected answers

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

  const handleResponseChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  return (
    <div className={styles.viewSurvey}>
      <button className={styles.backButton} onClick={onBack}>Back</button>
      
      <div className={styles.logoContainer}>
        <img src={Tuplogo} alt="TUP logo" className={styles.logo} />
        <img src={Alumnilogo} alt="Alumni logo" className={styles.logo} />
      </div>

      {loading ? (
        <p className={styles.loading}>Loading survey...</p>
      ) : survey ? (
        <div className={styles.surveyContainer}>
          <h2 className={styles.viewTitle}>{survey.survey.title}</h2>
          <p className={styles.description}>{survey.survey.description}</p>

          <h3 className={styles.questionsTitle}>Fill up the required fields:</h3>
          <form className={styles.form}>
            {survey.questions.map((question, index) => (
              <div key={question._id} className={styles.questionBox}>
                <p className={styles.questionText}>{index + 1}. {question.questionText}</p>

                {/* Short Answer Input */}
                {question.questionType === "text" && (
                  <input
                    type="text"
                    className={styles.textInput}
                    placeholder="Your answer here..."
                    value={responses[question._id] || ""}
                    onChange={(e) => handleResponseChange(question._id, e.target.value)}
                  />
                )}

                {/* Multiple-Choice (Radio) */}
                {question.questionType === "multiple-choice" && (
                  <ul className={styles.optionsList}>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        <label className={styles.optionLabels}>
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={option}
                            checked={responses[question._id] === option}
                            onChange={() => handleResponseChange(question._id, option)}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Checkbox for Multiple Selections */}
                {question.questionType === "checkbox" && (
                  <ul className={styles.optionsList}>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        <label className={styles.optionLabels}>
                          <input
                            type="checkbox"
                            value={option}
                            checked={(responses[question._id] || []).includes(option)}
                            onChange={(e) => {
                              const newSelection = responses[question._id] || [];
                              if (e.target.checked) {
                                newSelection.push(option);
                              } else {
                                newSelection.splice(newSelection.indexOf(option), 1);
                              }
                              handleResponseChange(question._id, [...newSelection]);
                            }}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </form>
        </div>
      ) : (
        <p className={styles.loading}>Survey not found.</p>
      )}
    </div>
  );
};
