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
      const response = await axios.get("http://alumnitracersystem.onrender.com/api/surveys");
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
      await axios.delete(`http://alumnitracersystem.onrender.com/api/surveys/${surveyId}`);
      setSurveys(surveys.filter((survey) => survey._id !== surveyId));
    } catch (error) {
      console.error("Error deleting survey:", error);
      alert("Failed to delete survey.");
    }
  };

  return (
    <div className={styles.tableWrapper}>
      {loading ? (
        <p className={styles.loading}>Loading surveys...</p>
      ) : surveys.length === 0 ? (
        <p className={styles.noSurveys}>No surveys available.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.header}>
              <th>NO.</th>
              <th>TITLE</th>
              <th>DATE CREATED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr key={survey._id} className={styles.row}>
                <td className={styles.cell}>{index + 1}</td>
                <td className={`${styles.cell} ${styles.clickable}`} onClick={() => onView(survey._id)}>
                  {survey.title}
                </td>
                <td className={styles.cell}>{new Date(survey.createdAt).toLocaleDateString()}</td>
                <td className={styles.actionCell}>
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
