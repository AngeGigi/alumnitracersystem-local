import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SurveyTable.module.css";

export const SurveyTable = ({ onView }) => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/surveys");
      setSurveys(response.data);
    } catch (error) {
      console.error("Error fetching surveys:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (surveyId) => {
    if (!window.confirm("Are you sure you want to delete this survey?")) return;

    try {
      await axios.delete(`http://localhost:5050/api/surveys/${surveyId}`);
      setSurveys(surveys.filter((survey) => survey._id !== surveyId));
    } catch (error) {
      console.error("Error deleting survey:", error);
      alert("Failed to delete survey.");
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <h2>Surveys</h2>
      {loading ? (
        <p>Loading surveys...</p>
      ) : surveys.length === 0 ? (
        <p>No surveys available.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr key={survey._id}>
                <td>{index + 1}</td>
                <td>{survey.title}</td>
                <td>{new Date(survey.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className={styles.viewButton} onClick={() => onView(survey._id)}>View</button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(survey._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
