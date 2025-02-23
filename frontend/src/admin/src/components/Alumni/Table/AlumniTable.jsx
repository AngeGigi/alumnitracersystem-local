// Frontend: AlumniTable.jsx
import React, { useEffect, useState } from 'react';
import styles from './AlumniTable.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  {jwtDecode} from 'jwt-decode';
import EmploymentHistory from './EmploymentHistory';

export function AlumniTable() {
  const [alumniData, setAlumniData] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert("Session expired. Please log in again.");
          navigate('/login');
          return;
        }

        jwtDecode(token); // Validate token

        const response = await axios.get('http://localhost:5050/api/alumni/all', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        console.log('API Response Data:', response.data); // Debug log
        if (response.data?.data) {
          setAlumniData(response.data.data);
        } else {
          alert('No alumni data available.');
          setAlumniData([]);
        }
      } catch (error) {
        console.error('Error fetching alumni data:', error);
        if (error.response?.status === 401) {
          alert("Authentication error. Please log in again.");
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleSelectAll = (e) => {
    setSelectedAlumni(e.target.checked ? new Set(alumniData.map((alumni) => alumni.userId)) : new Set());
  };

  const handleSelectAlumni = (id) => {
    const newSelected = new Set(selectedAlumni);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedAlumni(newSelected);
  };

  const openStudentDetails = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching details for user ID:', userId);

      const response = await axios.get(`http://localhost:5050/api/alumni/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('API response data:', response.data);

      if (response.data?.data) {
        setStudentDetails(response.data.data);
        console.log('Student Details:', response.data.data);
      } else {
        console.error('Unexpected API response structure:', response.data);
        alert('Failed to fetch student details.');
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
      if (error.response?.status === 404) {
        alert('Alumnus not found.');
      } else if (error.response?.status === 500) {
        alert('Server error. Please try again later.');
      } else {
        alert('An error occurred while fetching student details.');
      }
    }
  };

  const filteredAlumni = alumniData.filter((alumni) =>
    `${alumni.personalInfo.first_name} ${alumni.personalInfo.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log('Filtered Alumni:', filteredAlumni);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };


  return (
    <section className={styles.tableSection}>
      <div className={styles.tableControls}>
        <button
          onClick={() => setSelectedAlumni(new Set())}
          className={styles.deleteButton}
          disabled= 'true' //{selectedAlumni.size === 0}
        >
          DELETE
        </button>
        <div className={styles.searchContainer}>
          <label htmlFor="searchInput">SEARCH ALUMNI</label>
          <input
            type="search"
            id="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
  
      <div className={styles.tableWrapper} role="region" aria-label="Alumni table" tabIndex="0">
        <table className={styles.alumniTable}>
          <thead>
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  id="selectAll"
                  onChange={handleSelectAll}
                  aria-label="Select all alumni"
                  checked={selectedAlumni.size === alumniData.length}
                />
              </th>
              <th scope="col">TUP-ID</th>
              <th scope="col">Name</th>
              <th scope="col">College</th>
              <th scope="col">Course</th>
              <th scope="col">Email</th>
              <th scope="col">Birthday</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlumni.map((alumni) => (
              <tr
                key={alumni.userId || alumni.id}
                onClick={() => {
                  if (alumni.userId) {
                    openStudentDetails(alumni.userId);
                  } else {
                    alert('Error: Missing userId for selected alumnus.');
                  }
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    id={`select-${alumni.userId}`}
                    checked={selectedAlumni.has(alumni.userId)}
                    onChange={() => handleSelectAlumni(alumni.userId)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select ${alumni.userId}`}
                  />
                </td>
                <td>{alumni.generatedID || 'N/A'}</td>
                <td>{`${alumni.personalInfo?.first_name || 'N/A'} ${alumni.personalInfo?.last_name || 'N/A'}`}</td>
                <td>{alumni.personalInfo?.college || 'N/A'}</td>
                <td>{alumni.personalInfo?.course || 'N/A'}</td>
                <td>{alumni.personalInfo?.email_address || 'N/A'}</td>
                <td>{formatDate(alumni.personalInfo?.birthdate) || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {studentDetails && (
        <div className={styles.modalOverlay} onClick={() => setStudentDetails(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setStudentDetails(null)}>
              ×
            </button>
            {studentDetails.personalInfo ? (
              <>
                <div className={styles.studentProfile}>
                  <img
                    src={studentDetails.profileImage || 'http://via.placeholder.com/150'}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                  <h3>Personal Information</h3>
                    <div className={styles.profileInfo}>
                      <div>
                        <strong>Degree:</strong> {studentDetails.personalInfo.degree || 'N/A'}
                      </div>
                      <div>
                        <strong>College:</strong> {studentDetails.college || 'N/A'}
                      </div>
                      <div>
                        <strong>Course:</strong> {studentDetails.course || 'N/A'}
                      </div>
                      <div>
                        <strong>Graduation Year:</strong> {studentDetails.gradyear || 'N/A'}
                      </div>
                      <div>
                        <strong>Last Name:</strong> {studentDetails.personalInfo.last_name || 'N/A'}
                      </div>
                      <div>
                        <strong>First Name:</strong> {studentDetails.personalInfo.first_name || 'N/A'}
                      </div>
                      <div>
                        <strong>Middle Name:</strong> {studentDetails.personalInfo.middle_name || 'N/A'}
                      </div>
                      <div>
                        <strong>Address:</strong> {studentDetails.personalInfo.address || 'N/A'}
                      </div>
                      <div>
                        <strong>Birthday:</strong> {formatDate(studentDetails.personalInfo.birthdate) || 'N/A'}
                      </div>
                      <div>
                        <strong>Email:</strong> {studentDetails.personalInfo.email_address || 'N/A'}
                      </div>
                      <div>
                        <strong>Contact No:</strong> {studentDetails.personalInfo.contact_no || 'N/A'}
                      </div>
                    </div>
                  </div>
                    
                <hr className={styles.sectionDivider} />
                {/* Employment History Section */}
                    <EmploymentHistory employmentInfo={studentDetails?.employmentInfo || {}} />        
                <hr className={styles.sectionDivider} />
  
                {/* Submitted Surveys Section */}
                <div className={styles.submittedSurveys}>
                  <h3 style={{ color: '#900c3f' }}>Submitted Surveys</h3>
                  <table className={styles.surveysTable}>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Date Survey Received</th>
                        <th>Date Survey Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentDetails.surveys.map((survey, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{survey.title || 'N/A'}</td>
                          <td>{formatDate (survey.date) || 'N/A'}</td>
                          <td>{formatDate(survey.createdAt) || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className={styles.exportButton}>Export Summary</button>
                </div>
              </>
            ) : (
              <p>Error loading student details.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
  
}

export default AlumniTable;
