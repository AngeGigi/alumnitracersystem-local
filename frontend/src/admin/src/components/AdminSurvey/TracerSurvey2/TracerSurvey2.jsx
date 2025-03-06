import React from "react";
import styles from "./TracerSurvey2.module.css";

export const TracerSurvey2 = ({ onBack }) => {
  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>Back</button>
      <h2 className={styles.title}>Tracer Survey 2</h2>
      <p className={styles.description}>This is the content for Tracer Survey 2.</p>
    </div>
  );
};
