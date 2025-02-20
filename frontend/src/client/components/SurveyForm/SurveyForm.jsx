import React, { useState, useEffect } from "react";
import styles from "./surveyform.module.css"
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";

function SurveyForm() {
  return (
    <div>
      <Header />
      <SurveyFormPage />
    </div>
  );
}

const colleges = {
  "College of Engineering": [
    "Bachelor of Science in Civil Engineering",
    "Bachelor of Science in Electrical Engineering",
    "Bachelor of Science in Electronics Engineering",
    "Bachelor of Science in Mechanical Engineering",
  ],
  "College of Science": [
    "Bachelor of Applied Science in Laboratory Technology",
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Environmental Science",
    "Bachelor of Science in Information System",
    "Bachelor of Science in Information Technology",
  ],
  "College of Industrial Education": [
    "Bachelor of Science Industrial Education Major in Information and Communication Technology",
    "Bachelor of Science Industrial Education Major in Home Economics",
    "Bachelor of Science Industrial Education Major in Industrial Arts",
    "Bachelor of Technical Vocational Teachers Education Major in Animation",
    "Bachelor of Technical Vocational Teachers Education Major in Automotive",
    "Bachelor of Technical Vocational Teachers Education Major in Beauty Care and Wellness",
    "Bachelor of Technical Vocational Teachers Education Major in Computer Programming",
    "Bachelor of Technical Vocational Teachers Education Major in Electrical",
    "Bachelor of Technical Vocational Teachers Education Major in Electronics",
    "Bachelor of Technical Vocational Teachers Education Major in Food Service Management",
    "Bachelor of Technical Vocational Teachers Education Major in Fashion and Garment",
    "Bachelor of Technical Vocational Teachers Education Major in Heat Ventillation & Air Conditioning",
  ],
  "College of Liberal Arts": [
    "Bachelor of Science in Business Management Major in Industrial Management",
    "Bachelor of Science in Entreprenuership",
    "Bachelor of Science Hospitality Management",
  ],
  "College of Architecture and Fine Arts": [
    "Bachelor of Science in Architecture",
    "Bachelor of Fine Arts",
    "Bachelor of Graphic Technology Major in Architecture Technology",
    "Bachelor of Graphic Technology Major in Industrial Design",
    "Bachelor of Graphic Technology Major in Mechanical Drafting Technology",
  ],
  "College of Industrial Technology": [
    "Bachelor of Science in Food Technology",
    "Bachelor of Engineering Technology Major in Civil Technology",
    "Bachelor of Engineering Technology Major in Electrical Technology",
    "Bachelor of Engineering Technology Major in Electronics Technology",
    "Bachelor of Engineering Technology Major in Computer Engineering Technology",
    "Bachelor of Engineering Technology Major in Instrumentation and Control Technology",
    "Bachelor of Engineering Technology Major in Mechanical Technology",
    "Bachelor of Engineering Technology Major in Mechatronics Technology",
    "Bachelor of Engineering Technology Major in Railway Technology",
    "Bachelor of Engineering Technology Major in Mechanical Engineering Technology option in Automative Technology",
    "Bachelor of Engineering Technology Major in Mechanical Engineering Technology option in Heating Ventilation & Airconditioning/Refrigiration Technology",
    "Bachelor of Engineering Technology Major in Mechanical Engineering Technology option in Power Plant Technology",
    "Bachelor of Engineering Technology Major in Mechanical Engineering Technology option in Welding Technology",
    "Bachelor of Engineering Technology Major in Mechanical Engineering Technology option in Dies and Moulds Technology",
    "Bachelor of Technology in Apparel and Fashion",
    "Bachelor of Technology in Culinary Technology",
    "Bachelor of Technology in Print Media Technology",
  ],
};
function SurveyFormPage() {
    const [currentPage, setCurrentPage] = useState(1); // Track which page is active
    const [selectedCollege, setSelectedCollege] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");


    const handleCollegeChange = (e) => {
      setSelectedCollege(e.target.value);
      setSelectedCourse(""); // Reset course when college changes
    };
  
    const handleCourseChange = (e) => {
      setSelectedCourse(e.target.value);
    };
  
    const handleNextPage = () => setCurrentPage(2);
    const handlePreviousPage = () => setCurrentPage(1);
  
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format
  
    return (
      <div className={styles["survey-container"]}>
        <h1>Tracer Survey Form (2024)</h1>
  
        <form action="process_survey.php" method="post">
          {currentPage === 1 && (
            <>
              <h5>Personal Information</h5>
              <div className={styles["form-group"]}>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={currentDate}
                  readOnly
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="first_name">First Name:</label>
                <input type="text" id="first_name" name="first_name" required />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="last_name">Last Name:</label>
                <input type="text" id="last_name" name="last_name" required />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="middle_name">Middle Name:</label>
                <input type="text" id="middle_name" name="middle_name" />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="college">College:</label>
                <select
                  id="college"
                  name="college"
                  value={selectedCollege}
                  onChange={handleCollegeChange}
                  required
                >
                  <option value="">Select College</option>
                  {Object.keys(colleges).map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="course">Course:</label>
                <select
                  id="course"
                  name="course"
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  required
                  disabled={!selectedCollege}
                >
                  <option value="">Select Course</option>
                  {selectedCollege &&
                    colleges[selectedCollege].map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                </select>
              </div>
              <div className={styles["survey-form-button-container"]}>
                <button
                  type="button"
                  className={styles["surveyform-btn"]}
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </div>
            </>
          )}
  
          {currentPage === 2 && (
            <>
              <h5>Occupational Information</h5>
              <div className={styles["form-group"]}>
                <label htmlFor="occupation">Occupation:</label>
                <input type="text" id="occupation" name="occupation" required />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="company_name">Company Name:</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="year_started">
                  Year Started in the Company (Date of Employment):
                </label>
                <input
                  type="text"
                  id="year_started"
                  name="year_started"
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="position">Position / Designation:</label>
                <input type="text" id="position" name="position" required />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="job_status">Job Status:</label>
                <div className={styles["select-box"]}>
                  <select id="job_status" name="job_status" required>
                    <option value="Permanent">Permanent</option>
                    <option value="Contractual">Contractual / Project Based</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="type_of_organization">
                  Type of Organization:
                </label>
                <div className={styles["select-box"]}>
                  <select
                    id="type_of_organization"
                    name="type_of_organization"
                    required
                  >
                    <option value="Private">Private</option>
                    <option value="Non-Government">
                      Non-Government Organization
                    </option>
                    <option value="Self-Employed">Self-Employed</option>
                  </select>
                </div>
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="work_alignment">
                  Is your current work aligned with your academic specialization?
                </label>
                <div className={styles["select-box"]}>
                  <select
                    id="work_alignment"
                    name="work_alignment"
                    required
                  >
                    <option value="Very much aligned">Very much aligned</option>
                    <option value="Aligned">Aligned</option>
                    <option value="Averagely Aligned">
                      Averagely Aligned
                    </option>
                    <option value="Somehow Aligned">Somehow Aligned</option>
                    <option value="Unaligned">Unaligned</option>
                  </select>
                </div>
              </div>
              <div className={styles["survey-form-button-container"]}>
                <button
                  type="button"
                  className={styles["surveyform-prevbtn"]}
                  onClick={handlePreviousPage}
                >
                  Previous
                </button>
                <button className={styles["surveyform-btn"]} type="submit">
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    );
  }
  
  export default SurveyForm;