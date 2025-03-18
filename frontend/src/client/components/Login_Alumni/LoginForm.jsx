import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css'; // Import module-based styles

const TestLoginForm = ({ closeModal }) => {
  const [alumniID, setAlumniID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = { alumniID, password };

    console.log('Login attempt with:', formData); // Debug log

    try {
      const response = await fetch('https://localhost:5050/record/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Server response:', response.status, data); // Debug log

      if (response.ok) {
        console.log("Storing userId in localStorage:", data.user.id);
        localStorage.clear();
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        closeModal();
        navigate("/home");
      } else {
        alert(`Error: ${data.error || 'Login failed'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('There was an error with the login request.');
    }
  };

  return (
    <div className={styles.modalOverlayLogin}>
      <div className={styles.modalContentLogin}>
        <button className={styles.closeButtonLogin} onClick={closeModal}>
          &times;
        </button>
        <h2 className={styles.modalTitleLogin}>LOGIN</h2>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <h5>Alumni ID</h5>
          <input
            type="text"
            placeholder="Alumni ID"
            value={alumniID}
            onChange={(e) => setAlumniID(e.target.value)}
            required
            className={styles.inputFieldLogin}
          />
          <h5>Enter Password</h5>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputFieldLogin}
          />
          <button type="submit" className={styles.submitButtonLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestLoginForm;
