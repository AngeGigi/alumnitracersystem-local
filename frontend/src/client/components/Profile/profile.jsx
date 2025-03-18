import React, { useState, useEffect } from 'react';
import styles from './profile.module.css'; // Import module-based styles
import Header from '../Header/header';
import Footer from '../FooterClient/Footer';
import ProfilePic from '../../components/image/ayne.jpg';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Profile() {
  return (
    <div>
      <Header />
      <ProfilePage />
      <Footer />
    </div>
  );
}

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    personalInfo: {},
    employmentInfo: {},
    surveys: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert("Session expired. Please log in again.");
          navigate('/frontpage');
          return;
        }

        try {
          const decoded = jwtDecode(token);
          if (!decoded.id) throw new Error('Invalid token');
        } catch (err) {
          alert("Invalid session. Please log in again.");
          localStorage.removeItem('token');
          navigate('/frontpage');
          return;
        }

        const response = await fetch('https://localhost:5050/profile/user-profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/frontpage');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.profileContainer}>
      <section className={styles.personalInfo}>
        <h2>Personal Information</h2>
        <div className={styles.profileSection}>
          <div className={styles.rowGroup}>
            <div className={styles.row}>
              <label>College</label>
              <input type="text" value={profileData.personalInfo?.college || ''} readOnly />
            </div>
            <div className={styles.row}>
              <label>Course</label>
              <input type="text" value={profileData.personalInfo?.course || ''} readOnly />
            </div>
            <div className={styles.row}>
              <label>Degree</label>
              <input type="text" value={profileData.personalInfo?.degree || ''} readOnly />
            </div>
          </div>

          <div className={styles.row}>
            <label>Name</label>
            <input
              type="text"
              value={`${profileData.personalInfo?.first_name || ''} ${profileData.personalInfo?.middle_name || ''} ${profileData.personalInfo?.last_name || ''}`}
              readOnly
            />
          </div>
          <div className={styles.row}>
            <label>Birthday</label>
            <input type="text" value={formatDate(profileData.personalInfo?.birthdate) || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Email</label>
            <input type="text" value={profileData.personalInfo?.email_address || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Contact Number</label>
            <input type="text" value={profileData.personalInfo?.contact_no || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Address</label>
            <input type="text" value={profileData.personalInfo?.address || ''} readOnly />
          </div>
        </div>
      </section>

      <section className={styles.employmentStatus}>
        <h2>Employment Status</h2>
        <div className={styles.details}>
          <div className={styles.row}>
            <label>Occupation</label>
            <input type="text" value={profileData.employmentInfo?.occupation || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Company</label>
            <input type="text" value={profileData.employmentInfo?.company_name || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Position</label>
            <input type="text" value={profileData.employmentInfo?.position || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Job Status</label>
            <input type="text" value={profileData.employmentInfo?.job_status || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Year Started</label>
            <input type="text" value={profileData.employmentInfo?.year_started || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Organization Type</label>
            <input type="text" value={profileData.employmentInfo?.type_of_organization || ''} readOnly />
          </div>
          <div className={styles.row}>
            <label>Work Alignment</label>
            <input type="text" value={profileData.employmentInfo?.work_alignment || ''} readOnly />
          </div>
        </div>
      </section>

      <section className={styles.completedSurveys}>
        <h2>Completed Surveys</h2>
        {profileData.surveys?.map((survey, index) => (
          <div key={survey._id} className={styles.surveyItem}>
            <p>Date Completed: {formatDate(survey.createdAt)}</p>
          </div>
        ))}
      </section>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
