import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addjobForm.css';
import Header from '../Header/header';
import Footer from '../FooterClient/Footer';

function AddJobForm() {
    return (
        <div>
            <Header />
            <AddjobFormMainPage />
            <Footer />
        </div>
    );
}

function AddjobFormMainPage() {
    const navigate = useNavigate();

    const goToJobPageGive = () => {
        navigate('/JobPageGive');
    };

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'full-time',
        description: '',
        responsibilities: '',
        qualifications: '',
        source: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first');
            return;
        }


        try {
            const response = await fetch("https://localhost:5050/jobs/jobpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || 'Failed to post the job.');
                console.error('Error Response:', data);
                return;
            }


            console.log('Response Data:', data);

            setMessage('Job posted successfully. Pending admin approval.');
            setFormData({
                title: '',
                company: '',
                location: '',
                type: 'full-time',
                description: '',
                responsibilities: '',
                qualifications: '',
                source: '',
            });
        } catch (error) {
            console.error('Error posting the job:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <a onClick={goToJobPageGive} className="back-button">
                Back
            </a>
            <h1 className="form-title">POST A JOB OPPORTUNITY </h1>
            <form className="opportunity-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter Job Title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Enter company name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="Enter job location"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange}>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Job Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Enter job description"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="responsibilities">Key Responsibilities:</label>
                    <textarea
                        id="responsibilities"
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleChange}
                        placeholder="Enter key responsibilities"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="qualifications">Qualification:</label>
                    <textarea
                        id="qualifications"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                        placeholder="Enter required qualifications"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="source">Source:</label>
                    <input
                        type="text"
                        id="source"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        placeholder="Enter the source or link"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
                {message && <p className="form-message">{message}</p>}
                <p className="form-note">
                    NOTE: When submitted, an admin will review the request to post the offer. You will get
                    notified regarding the status of your post.
                </p>
            </form>
        </div>
    );
}

export default AddJobForm;
