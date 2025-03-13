import React, { useState } from "react";
import styles from "./TracerSurvey2.module.css";
import Tuplogo from "../images/Tuplogo.png";
import Alumnilogo from "../images/alumniassoc_logo.png";

export const TracerSurvey2 = ({ onBack }) => {
  const handleNextPage = () => setCurrentPage(currentPage + 1);
  const handlePrevPage = () => setCurrentPage(currentPage - 1);

  const [currentPage, setCurrentPage] = useState(1);

  //page 1 Educational background
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

  //page 2 
  // Training Programs State
  const [trainings, setTrainings] = useState([
    { title: "", duration: "", institution: "" },
  ]);
  const [motivation, setMotivation] = useState({
    promotion: false,
    professionalDevelopment: false,
    others: "",
  });

  const handleTrainingChange = (index, field, value) => {
    const updatedTrainings = [...trainings];
    updatedTrainings[index][field] = value;
    setTrainings(updatedTrainings);
  };
  const handleMotivationChange = (field, value) => {
    setMotivation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const addTrainingRow = () => {
    setTrainings([...trainings, { title: "", duration: "", institution: "" }]);
  };
  const removeTrainingRow = (index) => {
    if (trainings.length > 1) {
      setTrainings(trainings.filter((_, i) => i !== index));
    }
  };

  // Page 3: Employment Data
  // Employment Status State
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [unemploymentReasons, setUnemploymentReasons] = useState({
    furtherStudy: false,
    noJobOpportunity: false,
    familyConcern: false,
    didNotLook: false,
    healthRelated: false,
    other: "",
    lackExperience: false,
  });
  const [employmentStatusType, setEmploymentStatusType] = useState("");
  const [occupation, setOccupation] = useState("");
  const [lineOfBusiness, setLineOfBusiness] = useState("");
  const [placeOfWork, setPlaceOfWork] = useState("");
  const [firstJob, setFirstJob] = useState("");
  const [jobRelatedToCourse, setJobRelatedToCourse] = useState("");
  const [stayingReasons, setStayingReasons] = useState({
    salariesBenefits: false,
    careerChallenge: false,
    specialSkill: false,
    relatedToCourse: false,
    proximity: false,
    peerInfluence: false,
    familyInfluence: false,
    other: "",
  });
  const [acceptingJobReasons, setAcceptingJobReasons] = useState({
    salariesBenefits: false,
    careerChallenge: false,
    specialSkill: false,
    proximity: false,
    other: "",
  });
  const [changingJobReasons, setChangingJobReasons] = useState({
    salariesBenefits: false,
    careerChallenge: false,
    specialSkill: false,
    proximity: false,
    other: "",
  });
  const [firstJobDuration, setFirstJobDuration] = useState("");
  const [firstJobSearch, setFirstJobSearch] = useState({
    advertisement: false,
    walkIn: false,
    recommended: false,
    friends: false,
    schoolPlacement: false,
    familyBusiness: false,
    jobFair: false,
    other: "",
  });
  const [jobLandingTime, setJobLandingTime] = useState("");
  const [jobLevel, setJobLevel] = useState({
    rankClerical: { firstJob: false, currentJob: false },
    professionalSupervisory: { firstJob: false, currentJob: false },
    managerialExecutive: { firstJob: false, currentJob: false },
    selfEmployed: { firstJob: false, currentJob: false },
  });
  // Salary State
  const [salaryRange, setSalaryRange] = useState("");

  // Curriculum Relevance State
  const [curriculumRelevant, setCurriculumRelevant] = useState("");

  // Competencies Used in First Job
  const [competencies, setCompetencies] = useState({
    communication: false,
    humanRelations: false,
    entrepreneurial: false,
    ITSkills: false,
    problemSolving: false,
    criticalThinking: false,
    other: "",
  });

  // Course Curriculum Suggestions
  const [curriculumSuggestions, setCurriculumSuggestions] = useState("");


  const handleEmploymentStatusChange = (status) => {
    setEmploymentStatus(status);
  };
  const handleUnemploymentReasonChange = (field, value) => {
    setUnemploymentReasons((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleEmploymentStatusTypeChange = (status) => {
    setEmploymentStatusType(status);
  };
  const handleLineOfBusinessChange = (business) => {
    setLineOfBusiness(business);
  };
  // Handle radio button changes
  const handleRadioChange = (setter, value) => {
    setter(value);
  };
  // Handle checkbox changes
  const handleCheckboxChange3 = (setter, field, value) => {
    setter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCheckboxChangeJobLevel = (field, column) => {
    setJobLevel((prev) => ({
      ...prev,
      [field]: { ...prev[field], [column]: !prev[field][column] },
    }));
  };
  




  const handleSubmit = () => {
    console.log("Educational Background:", education);
    console.log("Professional Examinations:", examinations);
    console.log("Reasons for Taking Course:", reasons);
    //page 2
    console.log("Training Programs:", trainings);
    console.log("Motivation for Advanced Studies:", motivation)
    //page 3
    console.log("Employment Status:", employmentStatus);
    console.log("Unemployment Reasons:", unemploymentReasons);
    console.log("Employment Status:", employmentStatus);
    console.log("Present Occupation:", occupation);
    console.log("Major Line of Business:", lineOfBusiness)
    console.log("Place of Work:", placeOfWork);
    console.log("First Job:", firstJob);
    console.log("Reasons for Staying:", stayingReasons);
    console.log("First Job Related to Course:", jobRelatedToCourse);
    console.log("Reasons for Accepting Job:", acceptingJobReasons);
    console.log("Reasons for Changing Job:", changingJobReasons);
    console.log("First Job Duration:", firstJobDuration);
    console.log("How First Job was Found:", firstJobSearch);
    console.log("Time Taken to Land First Job:", jobLandingTime);
    console.log("Job Level Position:", jobLevel);
    console.log("Initial Gross Salary:", salaryRange);
    console.log("Curriculum Relevance:", curriculumRelevant);
    console.log("Useful Competencies:", competencies);
    console.log("Curriculum Suggestions:", curriculumSuggestions);
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

      {currentPage === 1 && (

        <div>
          <div className={styles.titleContainer}>
            <p>Please fill all required fields</p>
            <h3>Educational Background</h3>
          </div>

          <div className="educationAttainment">
            <label htmlFor="" className={styles.sectionTitle}>Educational Attainment</label>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Type</th>
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
                      <td>
                        <select value={entry.type} onChange={(e) => handleEducationChange(index, "type", e.target.value)}>
                          <option value="">Select Type</option>
                          <option value="Bachelor">Bachelor</option>
                          <option value="Masters">Masters</option>
                          <option value="Doctorate">Doctorate</option>
                        </select>
                      </td>
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
          <button className={styles.nextButton} onClick={handleNextPage}>Next</button>
        </div>

      )}
      {/* Page 2: Training(s)/Advanced Studies */}
      {currentPage === 2 && (
        <div>
          <div>
            <div className={styles.titleContainer}>
              <p>Please fill all required fields</p>
              <h3>Training(s)/Advance Studies Attended after College</h3>
            </div>

            <h3 className={styles.sectionTitle}>
              Please list down all the professional training programs or advanced studies you have attended after college.
            </h3>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Title of Training or Advanced Study</th>
                    <th>Duration & Credits Earned</th>
                    <th>Name of Training Institution/College/University</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.map((entry, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={entry.title}
                          onChange={(e) => handleTrainingChange(index, "title", e.target.value)}
                          placeholder="e.g., Project Management Certification"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={entry.duration}
                          onChange={(e) => handleTrainingChange(index, "duration", e.target.value)}
                          placeholder="e.g., 6 months, 12 credits"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={entry.institution}
                          onChange={(e) => handleTrainingChange(index, "institution", e.target.value)}
                          placeholder="e.g., Harvard University"
                        />
                      </td>
                      <td>
                        {trainings.length > 1 && (
                          <button className={styles.removeButton} onClick={() => removeTrainingRow(index)}>✖</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className={styles.addButton} onClick={addTrainingRow}>+ Add Row</button>

            {/* Motivation for Pursuing Advanced Studies */}
            <h3 className={styles.sectionTitle}>
              What made you pursue advanced studies?
            </h3>
            <div className={styles.motivationContainer}>
              <label className={styles.motivationLabel}>
                <input
                  type="checkbox"
                  checked={motivation.promotion}
                  onChange={(e) => handleMotivationChange("promotion", e.target.checked)}
                />
                For Promotion
              </label>
              <label className={styles.motivationLabel}>
                <input
                  type="checkbox"
                  checked={motivation.professionalDevelopment}
                  onChange={(e) => handleMotivationChange("professionalDevelopment", e.target.checked)}
                />
                For Professional Development
              </label>
              <label className={styles.motivationLabel}>
                <input
                  type="checkbox"
                  checked={motivation.others}
                  onChange={(e) => handleMotivationChange("others", e.target.checked)}
                />
                Others
              </label>

            </div>
          </div>
          <button className={styles.nextButton} onClick={handleNextPage}>Next</button>
        </div>
      )}
      {currentPage === 3 && (
        <div>
          <div className={styles.titleContainer}>
            <p>Please fill all required fields</p>
            <h3>EMPLOYMENT DATA</h3>
          </div>

          <h3 className={styles.sectionTitle}>Are you presently employed?</h3>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="employmentStatus"
                value="yes"
                checked={employmentStatus === "yes"}
                onChange={() => handleEmploymentStatusChange("yes")}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="employmentStatus"
                value="no"
                checked={employmentStatus === "no"}
                onChange={() => handleEmploymentStatusChange("no")}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="employmentStatus"
                value="neverEmployed"
                checked={employmentStatus === "neverEmployed"}
                onChange={() => handleEmploymentStatusChange("neverEmployed")}
              />
              Never Employed
            </label>
          </div>

          {/* Reasons for Not Being Employed */}
          {employmentStatus === "no" || employmentStatus === "neverEmployed" ? (
            <>
              <h3 className={styles.sectionTitle}>Please state reason(s) why you are not yet employed.</h3>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={unemploymentReasons.furtherStudy}
                    onChange={(e) => handleUnemploymentReasonChange("furtherStudy", e.target.checked)}
                  />
                  Advance or further study
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={unemploymentReasons.noJobOpportunity}
                    onChange={(e) => handleUnemploymentReasonChange("noJobOpportunity", e.target.checked)}
                  />
                  No job opportunity
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={unemploymentReasons.familyConcern}
                    onChange={(e) => handleUnemploymentReasonChange("familyConcern", e.target.checked)}
                  />
                  Family concern and decided not to find a job
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={unemploymentReasons.didNotLook}
                    onChange={(e) => handleUnemploymentReasonChange("didNotLook", e.target.checked)}
                  />
                  Did not look for a job
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={unemploymentReasons.healthRelated}
                    onChange={(e) => handleUnemploymentReasonChange("healthRelated", e.target.checked)}
                  />
                  Health-related reason(s)
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={unemploymentReasons.lackExperience}
                    onChange={(e) => handleUnemploymentReasonChange("lackExperience", e.target.checked)}
                  />
                  Lack of work experience
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={unemploymentReasons.other !== ""}
                    onChange={(e) => handleUnemploymentReasonChange("other", e.target.checked ? "" : unemploymentReasons.other)}
                  />
                  Other reason(s), please specify:
                </label>
                {unemploymentReasons.other !== "" && (
                  <input
                    type="text"
                    value={unemploymentReasons.other}
                    onChange={(e) => handleUnemploymentReasonChange("other", e.target.value)}
                    placeholder="Specify other reasons..."
                    className={styles.otherInput}
                  />
                )}
              </div>
            </>

          ) : null}
          <div>
            {/* Present Employment Status */}
            <h3 className={styles.sectionTitle}>Present Employment Status</h3>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Regular"
                  checked={employmentStatus === "Regular"}
                  onChange={() => handleEmploymentStatusChange("Regular")}
                />
                Regular or Permanent
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Contractual"
                  checked={employmentStatus === "Contractual"}
                  onChange={() => handleEmploymentStatusChange("Contractual")}
                />
                Contractual
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Temporary"
                  checked={employmentStatus === "Temporary"}
                  onChange={() => handleEmploymentStatusChange("Temporary")}
                />
                Temporary
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Self-employed"
                  checked={employmentStatus === "Self-employed"}
                  onChange={() => handleEmploymentStatusChange("Self-employed")}
                />
                Self-employed
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Casual"
                  checked={employmentStatus === "Casual"}
                  onChange={() => handleEmploymentStatusChange("Casual")}
                />
                Casual
              </label>
            </div>

            {/* Present Occupation */}
            <h3 className={styles.sectionTitle}>Present Occupation</h3>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g., Grade School Teacher, Electrical Engineer, Self-employed"
              className={styles.textInput}
            />

            {/* Major Line of Business */}
            <h3 className={styles.sectionTitle}>Major Line of Business of the Company</h3>
            <p>(Check one only)</p>
            <div className={styles.businessOptions}>
              {[
                "Agriculture, Hunting, and Forestry",
                "Fishing",
                "Mining and Quarrying",
                "Manufacturing",
                "Electricity, Gas, and Water Supply",
                "Construction",
                "Wholesale and Retail Trade, repair of motor vehicles, motorcycles, and personal and household goods",
                "Hotels and Restaurants",
                "Transport Storage and Communication",
                "Financial Intermediation",
                "Real Estate, Renting, and Business Activities",
                "Public Administration and Defense; Compulsory Social Security",
                "Education",
                "Health and Social Work",
                "Other Community, Social, and Personal Service Activities",
                "Private Households with Employed Persons",
                "Extra-territorial Organizations and Bodies",
              ].map((business, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="lineOfBusiness"
                    value={business}
                    checked={lineOfBusiness === business}
                    onChange={() => handleLineOfBusinessChange(business)}
                  />
                  {business}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Place of Work</h3>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="placeOfWork"
                  value="Local"
                  checked={placeOfWork === "Local"}
                  onChange={() => handleRadioChange(setPlaceOfWork, "Local")}
                />
                Local
              </label>
              <label>
                <input
                  type="radio"
                  name="placeOfWork"
                  value="Abroad"
                  checked={placeOfWork === "Abroad"}
                  onChange={() => handleRadioChange(setPlaceOfWork, "Abroad")}
                />
                Abroad
              </label>
            </div>
            <h3 className={styles.sectionTitle}>Is this your first job after college?</h3>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="firstJob"
                  value="Yes"
                  checked={firstJob === "Yes"}
                  onChange={() => handleRadioChange(setFirstJob, "Yes")}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="firstJob"
                  value="No"
                  checked={firstJob === "No"}
                  onChange={() => handleRadioChange(setFirstJob, "No")}
                />
                No
              </label>
            </div>
            {firstJob === "Yes" && (
              <>
                <h3 className={styles.sectionTitle}>What are your reason(s) for staying on the job?</h3>
                <div className={styles.checkboxGroup}>
                  {Object.keys(stayingReasons).map((reason, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        checked={stayingReasons[reason]}
                        onChange={(e) => handleCheckboxChange3(setStayingReasons, reason, e.target.checked)}
                      />
                      {reason.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                  ))}
                  {stayingReasons.other !== "" && (
                    <input
                      type="text"
                      value={stayingReasons.other}
                      onChange={(e) => handleCheckboxChange3(setStayingReasons, "other", e.target.value)}
                      placeholder="Specify other reasons..."
                      className={styles.otherInput}
                    />
                  )}
                </div>
                <h3 className={styles.sectionTitle}>Is your first job related to the course you took up in college?</h3>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="jobRelatedToCourse"
                      value="Yes"
                      checked={jobRelatedToCourse === "Yes"}
                      onChange={() => handleRadioChange(setJobRelatedToCourse, "Yes")}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jobRelatedToCourse"
                      value="No"
                      checked={jobRelatedToCourse === "No"}
                      onChange={() => handleRadioChange(setJobRelatedToCourse, "No")}
                    />
                    No
                  </label>
                </div>
              </>
            )}
            {jobRelatedToCourse === "Yes" && (
              <>
                <h3 className={styles.sectionTitle}>What were your reasons for accepting the job?</h3>
                <div className={styles.checkboxGroup}>
                  {Object.keys(acceptingJobReasons).map((reason, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        checked={acceptingJobReasons[reason]}
                        onChange={(e) => handleCheckboxChange3(setAcceptingJobReasons, reason, e.target.checked)}
                      />
                      {reason.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                  ))}
                  {acceptingJobReasons.other !== "" && (
                    <input
                      type="text"
                      value={acceptingJobReasons.other}
                      onChange={(e) => handleCheckboxChange3(setAcceptingJobReasons, "other", e.target.value)}
                      placeholder="Specify other reasons..."
                      className={styles.otherInput}
                    />
                  )}
                </div>
              </>
            )}
            {firstJob === "No" && (
              <>
                <h3 className={styles.sectionTitle}>What were your reason(s) for changing jobs?</h3>
                <div className={styles.checkboxGroup}>
                  {Object.keys(changingJobReasons).map((reason, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        checked={changingJobReasons[reason]}
                        onChange={(e) => handleCheckboxChange3(setChangingJobReasons, reason, e.target.checked)}
                      />
                      {reason.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                  ))}
                  {changingJobReasons.other !== "" && (
                    <input
                      type="text"
                      value={changingJobReasons.other}
                      onChange={(e) => handleCheckboxChange3(setChangingJobReasons, "other", e.target.value)}
                      placeholder="Specify other reasons..."
                      className={styles.otherInput}
                    />
                  )}
                </div>
              </>
            )}
            <div>
              <h3 className={styles.sectionTitle}>How long did you stay in your first job?</h3>
              <div className={styles.radioGroup}>
                {[
                  "Less than a month",
                  "1 to 6 months",
                  "7 to 11 months",
                  "1 year to less than 2 years",
                  "2 years to less than 3 years",
                  "3 years to less than 4 years",
                ].map((duration, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="firstJobDuration"
                      value={duration}
                      checked={firstJobDuration === duration}
                      onChange={() => handleRadioChange(setFirstJobDuration, duration)}
                    />
                    {duration}
                  </label>
                ))}
                {/* Other option */}
                <label>
                  <input
                    type="radio"
                    name="firstJobDuration"
                    value="Other"
                    checked={firstJobDuration === "Other"}
                    onChange={() => handleRadioChange(setFirstJobDuration, "Other")}
                  />
                  Others, please specify:
                </label>
                {firstJobDuration === "Other" && (
                  <input
                    type="text"
                    value={firstJobDuration}
                    onChange={(e) => handleRadioChange(setFirstJobDuration, e.target.value)}
                    placeholder="Specify duration..."
                    className={styles.otherInput}
                  />
                )}
              </div>
              <h3 className={styles.sectionTitle}>How did you find your first job?</h3>
              <div className={styles.checkboxGroup}>
                {[
                  { key: "advertisement", label: "Response to an advertisement" },
                  { key: "walkIn", label: "As walk-in applicant" },
                  { key: "recommended", label: "Recommended by someone" },
                  { key: "friends", label: "Information from friends" },
                  { key: "schoolPlacement", label: "Arranged by school’s job placement officer" },
                  { key: "familyBusiness", label: "Family business" },
                  { key: "jobFair", label: "Job Fair or Public Employment Service Office (PESO)" },
                ].map((option) => (
                  <label key={option.key}>
                    <input
                      type="checkbox"
                      checked={firstJobSearch[option.key]}
                      onChange={(e) => handleCheckboxChange3(setFirstJobSearch, option.key, e.target.checked)}
                    />
                    {option.label}
                  </label>
                ))}
                <label>
                  <input
                    type="checkbox"
                    checked={firstJobSearch.other !== ""}
                    onChange={(e) => handleCheckboxChange3(setFirstJobSearch, "other", e.target.checked ? "" : firstJobSearch.other)}
                  />
                  Others, please specify:
                </label>
                {firstJobSearch.other !== "" && (
                  <input
                    type="text"
                    value={firstJobSearch.other}
                    onChange={(e) => handleCheckboxChange3(setFirstJobSearch, "other", e.target.value)}
                    placeholder="Specify how you found your job..."
                    className={styles.otherInput}
                  />
                )}
              </div>
              <h3 className={styles.sectionTitle}>How long did it take you to land your first job?</h3>
              <div className={styles.radioGroup}>
                {[
                  "Less than a month",
                  "1 to 6 months",
                  "7 to 11 months",
                  "1 year to less than 2 years",
                  "2 years to less than 3 years",
                  "3 years to less than 4 years",
                ].map((time, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="jobLandingTime"
                      value={time}
                      checked={jobLandingTime === time}
                      onChange={() => handleRadioChange(setJobLandingTime, time)}
                    />
                    {time}
                  </label>
                ))}
                <label>
                  <input
                    type="radio"
                    name="jobLandingTime"
                    value="Other"
                    checked={jobLandingTime === "Other"}
                    onChange={() => handleRadioChange(setJobLandingTime, "Other")}
                  />
                  Others, please specify:
                </label>
                {jobLandingTime === "Other" && (
                  <input
                    type="text"
                    value={jobLandingTime}
                    onChange={(e) => handleRadioChange(setJobLandingTime, e.target.value)}
                    placeholder="Specify time duration..."
                    className={styles.otherInput}
                  />
                )}
              </div>
            </div>
          </div>
          <h3 className={styles.sectionTitle}>Job Level Position</h3>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Job Level</th>
              <th>First Job</th>
              <th>Current or Present Job</th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: "rankClerical", label: "Rank or Clerical" },
              { key: "professionalSupervisory", label: "Professional, Technical or Supervisory" },
              { key: "managerialExecutive", label: "Managerial or Executive" },
              { key: "selfEmployed", label: "Self-employed" },
            ].map((job, index) => (
              <tr key={index}>
                <td>{job.label}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={jobLevel[job.key].firstJob}
                    onChange={() => handleCheckboxChangeJobLevel(job.key, "firstJob")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={jobLevel[job.key].currentJob}
                    onChange={() => handleCheckboxChangeJobLevel(job.key, "currentJob")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className={styles.sectionTitle}>31. What is your initial gross monthly earning in your first job after college?</h3>
      <div className={styles.radioGroup}>
        {[
          "Below P5,000.00",
          "P5,000.00 to less than P10,000.00",
          "P10,000.00 to less than P15,000.00",
          "P15,000.00 to less than P20,000.00",
          "P20,000.00 to less than P25,000.00",
          "P25,000.00 and above",
        ].map((range, index) => (
          <label key={index}>
            <input
              type="radio"
              name="salaryRange"
              value={range}
              checked={salaryRange === range}
              onChange={() => handleRadioChange(setSalaryRange, range)}
            />
            {range}
          </label>
        ))}
      </div>

      {/* Question 32: Was Curriculum Relevant? */}
      <h3 className={styles.sectionTitle}>32. Was the curriculum you had in college relevant to your first job?</h3>
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="curriculumRelevant"
            value="Yes"
            checked={curriculumRelevant === "Yes"}
            onChange={() => handleRadioChange(setCurriculumRelevant, "Yes")}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="curriculumRelevant"
            value="No"
            checked={curriculumRelevant === "No"}
            onChange={() => handleRadioChange(setCurriculumRelevant, "No")}
          />
          No
        </label>
      </div>

      {/* Question 33: If Yes, Competencies Used in First Job */}
      {curriculumRelevant === "Yes" && (
        <>
          <h3 className={styles.sectionTitle}>
            33. What competencies learned in college did you find very useful in your first job? (Check all that apply)
          </h3>
          <div className={styles.checkboxGroup}>
            {[
              { key: "communication", label: "Communication skills" },
              { key: "humanRelations", label: "Human Relations skills" },
              { key: "entrepreneurial", label: "Entrepreneurial skills" },
              { key: "ITSkills", label: "Information Technology skills" },
              { key: "problemSolving", label: "Problem-solving skills" },
              { key: "criticalThinking", label: "Critical Thinking skills" },
            ].map((competency) => (
              <label key={competency.key}>
                <input
                  type="checkbox"
                  checked={competencies[competency.key]}
                  onChange={(e) => handleCheckboxChange3(setCompetencies, competency.key, e.target.checked)}
                />
                {competency.label}
              </label>
            ))}
            {/* Other Option */}
            <label>
              <input
                type="checkbox"
                checked={competencies.other !== ""}
                onChange={(e) => handleCheckboxChange3(setCompetencies, "other", e.target.checked ? "" : competencies.other)}
              />
              Other skills, please specify:
            </label>
            {competencies.other !== "" && (
              <input
                type="text"
                value={competencies.other}
                onChange={(e) => handleCheckboxChange3(setCompetencies, "other", e.target.value)}
                placeholder="Specify other skills..."
                className={styles.otherInput}
              />
            )}
          </div>
        </>
      )}

      {/* Question 34: Course Curriculum Suggestions */}
      <h3 className={styles.sectionTitle}>34. List down suggestions to further improve your course curriculum</h3>
      <textarea
        value={curriculumSuggestions}
        onChange={(e) => setCurriculumSuggestions(e.target.value)}
        placeholder="Enter your suggestions here..."
        className={styles.textarea}
      />

      <div className={styles.buttonRow}>
        <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
        </div>
      )}
    </div>
  );
};
