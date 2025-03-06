import React, { useState } from "react";
import styles from "./TracerSurvey2.module.css";
import Tuplogo from "../images/Tuplogo.png";
import Alumnilogo from "../images/alumniassoc_logo.png";

export const TracerSurvey2 = ({ onBack }) => {
  const [education, setEducation] = useState([
    { degree: "", college: "", yearGraduated: "", honors: "" },
  ]);

  const [examinations, setExaminations] = useState([
    { examName: "", dateTaken: "", rating: "" },
  ]);

  const [reasons, setReasons] = useState({
    highGradesRelated: { undergraduate: false, graduate: false },
    goodHighSchoolGrades: { undergraduate: false, graduate: false },
    parentInfluence: { undergraduate: false, graduate: false },
    peerInfluence: { undergraduate: false, graduate: false },
    roleModel: { undergraduate: false, graduate: false },
    passion: { undergraduate: false, graduate: false },
    employmentProspects: { undergraduate: false, graduate: false },
    professionPrestige: { undergraduate: false, graduate: false },
    courseAvailability: { undergraduate: false, graduate: false },
    careerAdvancement: { undergraduate: false, graduate: false },
    affordability: { undergraduate: false, graduate: false },
    attractiveCompensation: { undergraduate: false, graduate: false },
    abroadEmployment: { undergraduate: false, graduate: false },
    noChoice: { undergraduate: false, graduate: false },
  });

  // Handle input changes for education table
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  // Handle input changes for examinations table
  const handleExamChange = (index, field, value) => {
    const updatedExams = [...examinations];
    updatedExams[index][field] = value;
    setExaminations(updatedExams);
  };

  // Add & remove rows for education table
  const addEducationRow = () => {
    setEducation([...education, { degree: "", college: "", yearGraduated: "", honors: "" }]);
  };

  const removeEducationRow = (index) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  // Add & remove rows for examinations table
  const addExamRow = () => {
    setExaminations([...examinations, { examName: "", dateTaken: "", rating: "" }]);
  };

  const removeExamRow = (index) => {
    if (examinations.length > 1) {
      setExaminations(examinations.filter((_, i) => i !== index));
    }
  };

  const handleCheckboxChange = (reason, level) => {
    setReasons((prev) => ({
      ...prev,
      [reason]: { ...prev[reason], [level]: !prev[reason][level] },
    }));
  };

  const handleSubmit = () => {
    console.log("Educational Background:", education);
    console.log("Professional Examinations:", examinations);
    console.log("Reasons for Taking Course:", reasons);
    alert("Data submitted successfully!");
  };


  return (
    <div className={styles.tracer2Container}>
      <button className={styles.backButton} onClick={onBack}>Back</button>

      <div className={styles.logoContainer}>
        <img src={Tuplogo} alt="TUP logo" className={styles.logo} />
        <img src={Alumnilogo} alt="Alumni logo" className={styles.logo} />
      </div>
      <h2 className={styles.title}>Tracer Survey 2</h2>


      {/* Educational Attainment Table */}
      <div className={styles.titleContainer}>
        <p>Please fill all required fields</p>
        <h3 className="sectionTitleOG">Edicational Background</h3>
      </div>
      
      <div className="educationAttainment">
        <label htmlFor="" className={styles.sectionTitle}>Educational Attainment</label>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Degree & Specialization</th>
                <th>College/University</th>
                <th>Year Graduated</th>
                <th>Honors/Awards</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {education.map((entry, index) => (
                <tr key={index}>
                  <td><input type="text" value={entry.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} placeholder="e.g., BS Computer Science" /></td>
                  <td><input type="text" value={entry.college} onChange={(e) => handleEducationChange(index, "college", e.target.value)} placeholder="e.g., TUP Manila" /></td>
                  <td><input type="number" value={entry.yearGraduated} onChange={(e) => handleEducationChange(index, "yearGraduated", e.target.value)} placeholder="e.g., 2022" /></td>
                  <td><input type="text" value={entry.honors} onChange={(e) => handleEducationChange(index, "honors", e.target.value)} placeholder="e.g., Cum Laude" /></td>
                  <td>{education.length > 1 && <button className={styles.removeButton} onClick={() => removeEducationRow(index)}>✖</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className={styles.addButton} onClick={addEducationRow}>+ Add Row</button>

      {/* Professional Examinations Passed Table */}
      <div>
      <label htmlFor="" className={styles.sectionTitle}>Examination(s) Passed</label>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name of Examination</th>
                <th>Date Taken</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {examinations.map((entry, index) => (
                <tr key={index}>
                  <td><input type="text" value={entry.examName} onChange={(e) => handleExamChange(index, "examName", e.target.value)} placeholder="e.g., Civil Engineering Licensure" /></td>
                  <td><input type="date" value={entry.dateTaken} onChange={(e) => handleExamChange(index, "dateTaken", e.target.value)} /></td>
                  <td><input type="text" value={entry.rating} onChange={(e) => handleExamChange(index, "rating", e.target.value)} placeholder="e.g., 85.5%" /></td>
                  <td>{examinations.length > 1 && <button className={styles.removeButton} onClick={() => removeExamRow(index)}>✖</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className={styles.addButton} onClick={addExamRow}>+ Add Row</button>

      {/* Reasons for Taking Course Table */}
      <div>
      <label htmlFor="" className={styles.sectionTitle}>Reason(s) for Taking the Course(s) or Pursuing Degree(s)</label>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Reasons</th>
                <th>Undergraduate (AB/BS)</th>
                <th>Graduate (MS/MA/PhD)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(reasons).map((reasonKey, index) => (
                <tr key={index}>
                  <td>{reasonKey.replace(/([A-Z])/g, " $1").trim()}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={reasons[reasonKey].undergraduate}
                      onChange={() => handleCheckboxChange(reasonKey, "undergraduate")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={reasons[reasonKey].graduate}
                      onChange={() => handleCheckboxChange(reasonKey, "graduate")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Submit Button */}
      <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
    </div>
  );
};
