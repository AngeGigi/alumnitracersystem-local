import React, { useState } from 'react';
import styles from './SurveyFilters.module.css';
import SidebarLayout from "../../SideBar/SideBarLayout";
import { SurveyTable } from '../Table/SurveyTable';
import { PendingSurvey } from '../Table/PendingSurvey';
import { CreateSurvey } from '../CreateSurvey/CreateSurvey';
import { ViewSurvey } from "../Table/ViewSurvey";

export const SurveyFilters = () => {
  const [activeTab, setActiveTab] = useState('existing');
  const [activeFilter, setActiveFilter] = useState(null);
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  const [isCreatingSurvey, setIsCreatingSurvey] = useState(false);
  const [viewSurveyId, setViewSurveyId] = useState(null);

  const coursesByCollege = {
    COE: ["BSCE", "BSEE", "BSME"],
    CAFA: ["BSA", "BFA", "BGT major in AT", "BGT major in ID", "BGT major in MDT"],
    CLA: ["BSBM major in IM", "BSE", "BS HM"],
    CIE: [
      "BS IE major in ICT",
      "BS IE major in HE",
      "BS IE major in IA",
      "BTVTE major in ANIMATION",
      "BTVTE major in AUTOMATIVE",
      "BTVTE major in BCW",
      "BTVTE major in CP",
      "BTVTE major in ELECTRONIC",
      "BTVTE major in FSM",
      "BTVTE major in FG",
      "BTVTE major in HVAC",
    ],
    COS: ["BASLT", "BSCS", "BSES", "BSIS", "BSIT"],
    CIT: [
      "BSFT",
      "BET major in CT",
      "BET major in ET",
      "BET major in CET",
      "BET major in ECT",
      "BET major in ICT",
      "BET major in MT",
      "BET major in RT",
      "BTAF",
      "BTCT",
      "BTPT",
    ],
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setActiveFilter('year');
  };

  const handleCollegeChange = (e) => {
    setCollege(e.target.value);
    setActiveFilter('college');
  };

  const handleAddSurvey = () => {
    setIsCreatingSurvey(true);
    setViewSurveyId(null);
  };

  const handleBackToSurveyFilters = () => {
    setIsCreatingSurvey(false);
    setViewSurveyId(null);
  };

  return (
    <SidebarLayout>
      {isCreatingSurvey ? (
        <CreateSurvey onBack={handleBackToSurveyFilters} />
      ) : viewSurveyId ? (
        <ViewSurvey surveyId={viewSurveyId} onBack={handleBackToSurveyFilters} />
      ) : (
        <section className={styles.filterSection} aria-label="Survey filters">
          <div className={styles.header}>
            <h2 className={styles.pageTitle}>SURVEY MANAGEMENT</h2>
            <button
              className={styles.createButton}
              aria-label="Add new survey"
              onClick={handleAddSurvey}
            >
              + Add Survey
            </button>
          </div>

          {/* Filter Controls */}
          <div className={styles.filterControls} role="group" aria-label="Filter Controls">
            <div className={styles.filterButtonContainer}>
              <label htmlFor="year" className={styles.filterLabel}>Year:</label>
              <select
                id="year"
                className={`${styles.filterButton} ${activeFilter === 'year' ? styles.filterButtonActive : ''}`}
                value={year}
                onChange={handleYearChange}
              >
                <option value="">All Years</option>
                {Array.from({ length: 10 }, (_, i) => 2024 - i).map((yearOption) => (
                  <option key={yearOption} value={yearOption}>{yearOption}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterButtonContainer}>
              <label htmlFor="college" className={styles.filterLabel}>College:</label>
              <select
                id="college"
                className={`${styles.filterButton} ${activeFilter === 'college' ? styles.filterButtonActive : ''}`}
                value={college}
                onChange={handleCollegeChange}
              >
                <option value="">All Colleges</option>
                {Object.keys(coursesByCollege).map((collegeName) => (
                  <option key={collegeName} value={collegeName}>{collegeName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabs Section */}
          <div className={styles.tabSection} role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'existing'}
              className={`${styles.tab} ${activeTab === 'existing' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('existing')}
            >
              EXISTING
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'pending'}
              className={`${styles.tab} ${activeTab === 'pending' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              PENDING
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'existing' && <SurveyTable onView={setViewSurveyId} />}
            {activeTab === 'pending' && <PendingSurvey />}
          </div>
        </section>
      )}
    </SidebarLayout>
  );
};
