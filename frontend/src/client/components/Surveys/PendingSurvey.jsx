import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PendingSurvey.module.css';

export const PendingSurvey = () => {
    const navigate = useNavigate();

    const goToForm = () => {
        navigate('/SurveyForm');
    };

    // Example survey data (replace with actual data from props or API)
    const surveys = [
        { id: 1, title: "Tracer Survey Form (2024)", dateReceived: "Feb 15, 2024" },
        { id: 2, title: "Alumni Feedback Survey", dateReceived: "Jan 28, 2024" },
        { id: 3, title: "Post-Graduate Employment Survey", dateReceived: "Mar 3, 2024" }
    ];

    return (
        <div className={styles.surveyContainer}>
            <h2>PENDING SURVEYS</h2>
            <div className={styles.surveyList}>
                {surveys.map((survey) => (
                    <div key={survey.id} className={styles.surveyCard}>
                        <h3 className={styles.surveyTitle} onClick={goToForm}>
                            {survey.title}
                            <p className={styles.surveyDate}>Received: {survey.dateReceived}</p>
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingSurvey;
