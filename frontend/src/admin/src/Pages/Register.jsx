import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tuplogo from '../components/images/Tuplogo.png';
import Alumnilogo from '../components/images/alumniassoc_logo.png'
import styles from './Register.module.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await fetch('http://alumnitracersystem.onrender.com/adminlog_reg/adminregister', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Show success message
        localStorage.setItem('token', data.token); // Save token
        navigate("/alumni-page"); // Redirect
      } else {
        setMessage(data.error || "Registration failed."); // Show error message
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.registerBg}>
      <div className={styles.adminLoginLogo}>
        <img src={Tuplogo} alt="TUP logo" className={styles.logo1} />
        <img src={Alumnilogo} alt="Alumni logo" className={styles.logo2} />
      </div>
      
      {/* Title Section */}
      <div className={styles.adminLoginTitle}>
        <h3 className={styles.adminSystemTitle1}>TUPATS</h3>
        <h4 className={styles.adminSystemTitle2}>The Technological University of the Philippines Alumni Tracer System</h4>
        <h5 className={styles.adminSystemTitle3}>REGISTRATION</h5>
      </div>

      <div className={styles.registerContainer}>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name='confirmPassword'
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
        <button
          className={styles.loginButton}
          onClick={() => navigate('/login')}
        >
        LOGIN
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default AdminRegister;
