import React, { useState } from 'react';
import styles from './CompletedSurvey.module.css';

export const CompletedSurvey = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Example completed surveys (Replace with actual data from API)
    const surveys = [
        { id: 1, title: "Graduate Feedback Survey", dateReceived: "Jan 10, 2024" },
        { id: 2, title: "Employment Status Survey", dateReceived: "Feb 5, 2024" },
        { id: 3, title: "Alumni Engagement Survey", dateReceived: "Mar 1, 2024" }
    ];

    // Filter surveys based on search term
    const filteredSurveys = surveys.filter(survey =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.surveyContainer}>
            <h2>COMPLETED SURVEYS</h2>

            {/* Search Input */}
            <div>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Search surveys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            </div>
            

            {/* Survey List */}
            <div className={styles.surveyList}>
                {filteredSurveys.length > 0 ? (
                    filteredSurveys.map((survey) => (
                        <div key={survey.id} className={styles.surveyCard}>
                            <h3 className={styles.surveyTitle}>
                                {survey.title}
                            </h3>
                            <p className={styles.surveyDate}>
                                Completed on: {survey.dateReceived}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className={styles.noResults}>No surveys found.</p>
                )}
            </div>
        </div>
    );
};

export default CompletedSurvey;
