import React, { useState } from "react";
import styles from "./PendingSurvey.module.css";

export const PendingSurvey = () => {
  const surveys = [
    { id: 1, title: "Tracer Survey Form (2020)", status: "Pending" },
    { id: 2, title: "Subject Alignment", status: "Pending" },
  ];

  return (
    <div className={styles.container}>
      
        <div className={styles.tableContainer}>
         

          <table className={styles.table} role="table" aria-label="Pending Surveys">
            <thead className={styles.tableHeader}>
              <tr>
                <th scope="col" className={styles.headerCell}>No.</th>
                <th scope="col" className={styles.headerCell}>Title</th>
                <th scope="col" className={styles.headerCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((survey, index) => (
                <tr key={survey.id} className={styles.row}>
                  <td className={styles.cell}>{index + 1}</td>
                  <td className={styles.cell}>{survey.title}</td>
                  <td className={styles.cell}>
                    <button className={`${styles.actionButton} ${styles.editButton}`} aria-label={`Edit ${survey.title}`}>
                      EDIT
                    </button>
                    <button className={`${styles.actionButton} ${styles.publishButton}`} aria-label={`Publish ${survey.title}`}>
                      PUBLISH
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
    </div>
  );
};
