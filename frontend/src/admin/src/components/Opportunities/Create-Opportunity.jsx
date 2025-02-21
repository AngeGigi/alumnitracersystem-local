import React, { useState } from "react";
import styles from "./Create-Opportunity.module.css";

export default function CreateOpportunity({ onClose }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    college: "",
    course: "",
    location: "",
    jobDescription: "",
    keyResponsibilities: "",
    requirements: "",
  });

  const coursesByCollege = {
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
    ],
    "College of Liberal Arts": [
      "Bachelor of Science in Business Management Major in Industrial Management",
      "Bachelor of Science in Entrepreneurship",
      "Bachelor of Science in Hospitality Management",
    ],
    "College of Architecture and Fine Arts": [
      "Bachelor of Science in Architecture",
      "Bachelor of Fine Arts",
      "Bachelor of Graphic Technology Major in Architecture Technology",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "college" && { course: "" }), // Reset course if college changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in first.");
        return;
      }
  
      console.log("Submitting Form Data:", formData);
  
      const response = await fetch("https://localhost:5050/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.jobTitle,
          company: "Admin-created", // Hardcode for now or add a field for it in the form
          location: formData.location,
          type: "full-time", // Default type
          description: formData.jobDescription,
          responsibilities: formData.keyResponsibilities,
          qualifications: formData.requirements,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create job:", errorData);
        alert(errorData.error || "Failed to create job.");
        return;
      }
  
      alert("Opportunity Created Successfully!");
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error creating opportunity:", error);
      alert("An error occurred while creating the opportunity.");
    }
  };
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Create Opportunity</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="college">College</label>
            <select
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
            >
              <option value="">Select College</option>
              {Object.keys(coursesByCollege).map((collegeName) => (
                <option key={collegeName} value={collegeName}>
                  {collegeName}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="course">Course</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              disabled={!formData.college}
            >
              <option value="">Select Course</option>
              {formData.college &&
                coursesByCollege[formData.college].map((courseName) => (
                  <option key={courseName} value={courseName}>
                    {courseName}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="keyResponsibilities">Key Responsibilities</label>
            <textarea
              id="keyResponsibilities"
              name="keyResponsibilities"
              value={formData.keyResponsibilities}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Create Opportunity
          </button>
        </form>
      </div>
    </div>
  );
}
