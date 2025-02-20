import React, { useState } from 'react';
import styles from './SurveyPage.module.css';
import { PendingSurvey } from './PendingSurvey';
import { CompletedSurvey } from './CompletedSurvey';
import Header from "../Header/header";
import Footer from "../FooterClient/Footer";

function SurveyPage() {
    return (
        <div className={styles.surveyContainer}>
            <Header />
            <SurveyMainPage />
            <Footer />
        </div>
    );
}

function SurveyMainPage() {
    const [activeTab, setActiveTab] = useState('pending'); // Removed duplicate state

    return (
        <section>
            <div className={styles.surveyMainPage}>
                <div className={styles.buttonContainer}>
                    <button
                        role='tab'
                        aria-selected={activeTab === 'pending'}
                        className={`${styles.pendingButton} ${activeTab === 'pending' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        Pending Surveys
                    </button>
                    <button
                        role='tab'
                        aria-selected={activeTab === 'completed'}
                        className={`${styles.completedButton} ${activeTab === 'completed' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('completed')}
                    >
                        Completed Surveys
                    </button>
                </div>
                <div>
                    {activeTab === 'pending' ? <PendingSurvey /> : <CompletedSurvey />}
                </div>
            </div>
        </section>
    );
}

export default SurveyPage;
