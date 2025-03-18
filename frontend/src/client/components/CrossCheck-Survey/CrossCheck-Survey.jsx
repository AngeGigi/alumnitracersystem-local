import React, { useState, useCallback} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Correct way to import useNavigate
import styles from "./CrossCheck-Survey.module.css";
import Tuplogo from "../../components/image/Tuplogo.png";
import Alumnilogo from "../../components/image/alumniassoc_logo.png";
import nationalities from "./nationalities"; 

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
function CrossCheckSurveyForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    contact_no: "",
    birthdate: "",
    birthplace: "",
    sex: "",
    nationality: "",
    address: "",
    degree: "",
    college: "",
    course: "",
    occupation: "",
    company_name: "",
    year_started: "",
    job_status: "",
    position: "",
    type_of_organization: "",
    work_alignment: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleCollegeChange = (e) => {
    const selectedCollege = e.target.value;
    setFormData((prev) => ({
      ...prev,
      college: selectedCollege,
      course: "", // Reset course when college changes
    }));
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setFormData((prev) => ({
      ...prev,
      course: selectedCourse,
    }));
  };


  const validateForm = useCallback(() => {
    if (currentPage === 1) {
      return (
        formData.first_name.trim() &&
        formData.last_name.trim() &&
        formData.email_address.trim() &&
        formData.contact_no.trim() &&
        formData.birthdate &&
        formData.birthplace.trim() &&
        (formData.sex === "Male" || formData.sex === "Female") &&
        formData.nationality.trim() &&
        formData.address.trim() &&
        formData.degree &&
        formData.college.trim() &&
        formData.course.trim()
      );
    }
    if (currentPage === 2) {
      return (
        formData.occupation.trim() &&
        formData.company_name.trim() &&
        formData.year_started &&
        formData.position.trim() &&
        formData.job_status &&
        formData.type_of_organization &&
        formData.work_alignment
      );
    }
    return false;
  }, [currentPage, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Submitting Form Data:", formData); // Debug log
  
    if (!validateForm()) {
      setSubmitStatus({ type: "error", message: "Please fill in all required fields" });
      console.log("Validation Failed"); // Debug log
      return;
    }
    const userId = localStorage.getItem("userId"); // Retrieve the logged-in user's ID
      if (!userId) {
        setSubmitStatus({ type: "error", message: "User not logged in" });
        return;
      }
      console.log("Submitting survey for userId:", userId);
      
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        setSubmitStatus({ type: "error", message: "No token provided. Please log in again." });
        return;
      }

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://localhost:5050/surveys/submit', {
        userId,
        personalInfo: {
          first_name: formData.first_name,
          middle_name: formData.middle_name,
          last_name: formData.last_name,
          email_address: formData.email_address,
          contact_no: formData.contact_no,
          birthdate: formData.birthdate,
          birthplace: formData.birthplace,
          sex: formData.sex,
          nationality: formData.nationality,
          address: formData.address,
          degree: formData.degree,
          college: formData.college,
          course: formData.course,
        },
        employmentInfo: {
          occupation: formData.occupation,
          company_name: formData.company_name,
          year_started: formData.year_started,
          position: formData.position,
          job_status: formData.job_status,
          type_of_organization: formData.type_of_organization,
          work_alignment: formData.work_alignment,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } } 
    
    );


      if (response.data.success) {
        setSubmitStatus({ type: "success", message: "Survey submitted successfully!" });
        setTimeout(() => navigate("/profile"), 2000); // Redirect to homepage after 2 seconds
        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          email_address: "",
          contact_no: "",
          birthdate: "",
          birthplace: "",
          sex: "",
          nationality: "",
          address: "",
          degree: "",
          college: "",
          course: "",
          occupation: "",
          company_name: "",
          year_started: "",
          job_status: "",
          position: "",
          type_of_organization: "",
          work_alignment: "",
        });
        setCurrentPage(1);
        
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to submit survey. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles["survey-container"]}>
      <div className={styles["logo-container"]}>
        <img src={Tuplogo} alt="TUP logo" className={styles["logo-1"]} />
        <img src={Alumnilogo} alt="Alumni logo" className={styles["logo-2"]} />
      </div>

      <h1 className={styles["survey-title"]}>Tracer Survey Form (2024)</h1>

      {submitStatus.message && (
        <div className={`${styles.alert} ${styles[submitStatus.type]}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles["survey-form"]}>
        {currentPage === 1 ? (
          <>
            <h3 className={styles["section-title"]}>Personal Information</h3>
            <div className={styles["form-grid"]}>
              {/* Personal Information Fields */}
                          <div className={styles["form-group"]}>
                              <label htmlFor="first_name">First Name: *</label>
                              <input
                                  type="text"
                                  id="first_name"
                                  name="first_name"
                                  value={formData.first_name}
                                  onChange={handleChange}
                                  required
                                  className={styles["form-input"]}
                              />
                          </div>
  
                           <div className={styles["form-group"]}>
                                  <label htmlFor="middle_name">Middle Name:</label>
                                  <input
                                      type="text"
                                      id="middle_name"
                                      name="middle_name"
                                      value={formData.middle_name}
                                      onChange={handleChange}
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="last_name">Last Name: *</label>
                                  <input
                                      type="text"
                                      id="last_name"
                                      name="last_name"
                                      value={formData.last_name}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="email_address">Email Address: *</label>
                                  <input
                                      type="email"
                                      id="email_address"
                                      name="email_address"
                                      value={formData.email_address}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="contact_no">Contact Number: *</label>
                                  <input
                                      type="tel"
                                      id="contact_no"
                                      name="contact_no"
                                      value={formData.contact_no}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="birthdate">Birth Date: *</label>
                                  <input
                                      type="date"
                                      id="birthdate"
                                      name="birthdate"
                                      value={formData.birthdate}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="birthplace">Birth Place: *</label>
                                  <input
                                      type="text"
                                      id="birthplace"
                                      name="birthplace"
                                      value={formData.birthplace}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                <label>Sex: *</label>
                                <div className={styles["radio-group"]}>
                                  <label className={styles["radio-pill"]}>
                                    <input
                                      type="radio"
                                      name="sex"
                                      value="Male"
                                      checked={formData.sex === "Male"}
                                      onChange={handleChange}
                                      required
                                    />
                                    <span>Male</span>
                                  </label>
                                  <label className={styles["radio-pill"]}>
                                    <input
                                      type="radio"
                                      name="sex"
                                      value="Female"
                                      checked={formData.sex === "Female"}
                                      onChange={handleChange}
                                    />
                                    <span>Female</span>
                                  </label>
                                </div>
                              </div>

                              <div className={styles["form-group"]}>
                              <label>Nationality: *</label>
                                <select
                                  id="nationality"
                                  name="nationality"
                                  value={formData.nationality}
                                  onChange={handleChange}
                                  required
                                  className={styles["form-input"]}
                                >
                                  <option value="" disabled>Select your nationality</option>
                                  {nationalities.map((nation, index) => (
                                    <option key={index} value={nation}>
                                      {nation}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className={styles["form-group"]}>
                                  <label htmlFor="address">Complete Address: *</label>
                                  <input
                                      type="text"
                                      id="address"
                                      name="address"
                                      value={formData.address}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="degree">Degree: *</label>
                                  <select
                                      id="degree"
                                      name="degree"
                                      value={formData.degree}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-select"]}
                                  >
                                      <option value="">Select Degree</option>
                                      <option value="bachelors">Bachelor's Degree</option>
                                      <option value="masters">Master's Degree</option>
                                      <option value="doctorate">Doctorate Degree</option>
                                  </select>
                              </div>
  
                              <div className={styles["form-group"]}>
                              <label htmlFor="college">College: *</label>
                              <select
                                id="college"
                                name="college"
                                value={formData.college}
                                onChange={handleCollegeChange}
                                required
                                className={styles["form-select"]}
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
                              <label htmlFor="course">Course: *</label>
                              <select
                                id="course"
                                name="course"
                                value={formData.course}
                                onChange={handleCourseChange}
                                required
                                className={styles["form-select"]}
                                disabled={!formData.college}
                              >
                                <option value="">Select Course</option>
                                {formData.college &&
                                  colleges[formData.college].map((course) => (
                                    <option key={course} value={course}>
                                      {course}
                                    </option>
                                  ))}
                              </select>
                            </div>
                                    </div>

                          <div className={styles["survey-form-button-container"]}>
                            <button
                              type="button"
                              className={styles["surveyform-btn"]}
                              onClick={() => {
                                if (validateForm()) {
                                  setCurrentPage(2);
                                } else {
                                  setSubmitStatus({
                                    type: "error",
                                    message: "Please fill in all required fields",
                                  });
                                }
                              }}
                            >
                              Next
                            </button>
                          </div>
                </>
              ) : (
                <>
                  <h2 className={styles["section-title"]}>Occupational Information</h2>
                    <div className={styles["form-grid"]}>
                      {/* Occupational Information Fields */}
                          <div className={styles["form-group"]}>
                              <label htmlFor="occupation">Occupation: *</label>
                              <input
                                  type="text"
                                  id="occupation"
                                  name="occupation"
                                  value={formData.occupation}
                                  onChange={handleChange}
                                  required
                                  className={styles["form-input"]}
                              />
                          </div>
  
                          <div className={styles["form-group"]}>
                                  <label htmlFor="company_name">Company Name: *</label>
                                  <input
                                      type="text"
                                      id="company_name"
                                      name="company_name"
                                      value={formData.company_name}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="year_started">Year Started: *</label>
                                  <input
                                      type="number"
                                      id="year_started"
                                      name="year_started"
                                      value={formData.year_started}
                                      onChange={handleChange}
                                      required
                                      min="1900"
                                      max={new Date().getFullYear()}
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="position">Position: *</label>
                                  <input
                                      type="text"
                                      id="position"
                                      name="position"
                                      value={formData.position}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-input"]}
                                  />
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="job_status">Employment Status: *</label>
                                  <select
                                      id="job_status"
                                      name="job_status"
                                      value={formData.job_status}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-select"]}
                                  >
                                      <option value="">Select Status</option>
                                      <option value="Permanent">Permanent</option>
                                      <option value="Contractual/Project Based">Contractual/Project Based</option>
                                      <option value="Temporary">Temporary</option>
                                      <option value="Self-employed">Self-employed</option>
                                      <option value="Unemployed">Unemployed</option>
                                  </select>
                              </div>
  
                              <div className={styles["form-group"]}>
                                  <label htmlFor="type_of_organization">Type of Organization: *</label>
                                  <select
                                      id="type_of_organization"
                                      name="type_of_organization"
                                      value={formData.type_of_organization}
                                      onChange={handleChange}
                                      required
                                      className={styles["form-select"]}
                                  >
                                      <option value="">Select Type</option>
                                      <option value="Private">Private</option>
                                      <option value="NGO">NGO</option>
                                      <option value="Government">Government</option>
                                      <option value="Self-employed">Self-employed</option>
                                  </select>
                              </div>
                              <div className={styles["form-group"]}>
                                <label htmlFor="work_alignment">
                                  Work Alignment with Academic Specialization:
                                </label>
                                <select
                                  id="work_alignment"
                                  name="work_alignment"
                                  value={formData.work_alignment}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="">Select Alignment</option>
                                  <option value="Very much aligned">Very much aligned</option>
                                  <option value="Aligned">Aligned</option>
                                  <option value="Averagely Aligned">Averagely Aligned</option>
                                  <option value="Somehow Aligned">Somehow Aligned</option>
                                  <option value="Unaligned">Unaligned</option>
                                </select>
                              </div>
                    </div>

              <div className={styles["survey-form-button-container"]}>
                <button
                  type="button"
                  className={styles["surveyform-prevbtn"]}
                  onClick={() => setCurrentPage(1)}
                  disabled={isSubmitting}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className={styles["surveyform-btn"]}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </>
          )}
      </form>
    </div>
  );
}

export default CrossCheckSurveyForm;
