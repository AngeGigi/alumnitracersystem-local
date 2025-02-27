import React, { useState, useEffect } from "react";
import styles from './GraduatesList.module.css';
import axios from "axios";

const API_BASE_URL = "http://localhost:5050"; // Change this to your actual backend URL


export function GraduatesList() {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batches, setBatches] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      year: i + 2016,
      title: `Graduates ${i + 2016}`,
      graduates: [],
      importedDate: null
    }))
  );
  const [newBatchYear, setNewBatchYear] = useState('');
  const [newBatchTitle, setNewBatchTitle] = useState('');
  const [isAddingBatch, setIsAddingBatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [graduates, setGraduates] = useState([]);
  const [totalGraduates, setTotalGraduates] = useState(0); // ✅ New state


  useEffect(() => {
    const fetchGraduates = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`${API_BASE_URL}/api/graduates`);
        if (!response.ok) {
          throw new Error("Failed to fetch graduates.");
        }
        const data = await response.json();
        setGraduates(data);
        console.log("Graduates fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching graduates:", error);
        setError("Failed to load graduates. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchGraduates();
  }, []);
  
  // Updated Upload CSV to Backend with better error handling
const handleUpload = async () => {
  if (!uploadedFile) {
    alert("Please select a file.");
    return;
  }

  setIsLoading(true);
  setError(null);

  const formData = new FormData();
  formData.append("csvFile", uploadedFile);
  
  console.log("Uploading file:", uploadedFile.name);

  try {
    // Using axios for better error details
    const uploadResponse = await axios.post(
      `${API_BASE_URL}/api/BatchList`, 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log("Upload response:", uploadResponse.data);
    alert(uploadResponse.data.message || "Upload successful");

    // Fetch updated graduates list after upload
    const refreshResponse = await fetch(`${API_BASE_URL}/api/graduates`);
    if (!refreshResponse.ok) {
      throw new Error(`Failed to fetch updated graduates: ${refreshResponse.status}`);
    }

    const graduatesData = await refreshResponse.json();
    setGraduates(graduatesData);
    setUploadedFile(null);
    
    // Filter graduates by the selected batch to update the display
    const batchGraduates = graduatesData.filter(
      grad => grad.year_graduated === selectedBatch
    );
    console.log(`Found ${batchGraduates.length} graduates for batch ${selectedBatch}`);
    
  } catch (error) {
    console.error("Upload error details:", error);
    let errorMessage = "Failed to upload file";
    
    if (error.response) {
      // The server responded with an error status
      console.error("Server error response:", error.response.data);
      errorMessage = `Server error: ${error.response.data.error || error.response.status}`;
      if (error.response.data.details) {
        errorMessage += ` - ${error.response.data.details}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response from server. Check your connection.";
    } else {
      // Something else caused the error
      errorMessage = error.message;
    }
    
    setError(errorMessage);
    alert(`Upload failed: ${errorMessage}`);
  } finally {
    setIsLoading(false);
  }
};

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log("Imported file:", file);
      // TODO: Implement actual file parsing logic
    }
  };

  const handleAddBatch = () => {
    setIsAddingBatch(true);
    setNewBatchYear('');
    setNewBatchTitle('');
  };

  const handleSaveNewBatch = () => {
    if (newBatchYear && newBatchTitle) {
      const newBatchYearNum = parseInt(newBatchYear);
      const isDuplicate = batches.some(batch => batch.year === newBatchYearNum);

      if (!isDuplicate && !isNaN(newBatchYearNum)) {
        const newBatch = {
          year: newBatchYearNum,
          title: newBatchTitle,
          graduates: [],
          importedDate: null
        };

        const updatedBatches = [...batches, newBatch]
          .sort((a, b) => b.year - a.year);

        setBatches(updatedBatches);
        setNewBatchYear('');
        setNewBatchTitle('');
        setIsAddingBatch(false);
      } else {
        alert('Please enter a valid, unique batch year and title');
      }
    }
  };

  const handleCancelAddBatch = () => {
    setNewBatchYear('');
    setNewBatchTitle('');
    setIsAddingBatch(false);
  };

  const handleSaveBatchDetails = (e) => {
    e.preventDefault();
    // TODO: Implement save logic for batch details
    const batchIndex = batches.findIndex(b => b.year === selectedBatch);
    if (batchIndex !== -1) {
      const updatedBatches = [...batches];
      updatedBatches[batchIndex] = {
        ...updatedBatches[batchIndex],
        importedDate: uploadedFile ? new Date().toLocaleDateString() : null
      };
      setBatches(updatedBatches);
    }
  };

  const handleDeleteBatch = (batchYear) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Batch ${batchYear}?`);
    if (confirmDelete) {
      setBatches(batches.filter(batch => batch.year !== batchYear));
      setSelectedBatch(null);
    }
  };

  return (
    <div className={styles.graduatesContainer}>
      {!selectedBatch && (
        <div className={styles.batchesContainer}>
          {isAddingBatch && (
            <div className={styles.newBatchForm}>
              <input
                type="number"
                placeholder="Batch Year"
                value={newBatchYear}
                onChange={(e) => setNewBatchYear(e.target.value)}
                className={styles.inputField}
                min="2000"
                max="2030"
                required
              />
              <input
                type="text"
                placeholder="Batch Title"
                value={newBatchTitle}
                onChange={(e) => setNewBatchTitle(e.target.value)}
                className={styles.inputField}
                required
              />
              <div className={styles.newBatchButtons}>
                <button 
                  onClick={handleSaveNewBatch} 
                  className={styles.saveButton}
                  disabled={!newBatchYear || !newBatchTitle}
                >
                  Save
                </button>
                <button 
                  onClick={handleCancelAddBatch} 
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className={styles.batchButtonsContainer}>
            {batches.map((batch) => (
              <div key={batch.year} className={styles.batchButtonWrapper}>
                <button
                  className={styles.batchButton}
                  onClick={() => handleBatchClick(batch.year)}
                >
                  BATCH {batch.year} {batch.title}
                </button>
              </div>
            ))}
            <button 
              className={styles.addBatchButton}
              onClick={handleAddBatch}
            >
              + 
            </button>
          </div>
        </div>
      )}

      {selectedBatch && (
        <div className={styles.batchDetails}>
          <div className={styles.batchDetailsHeader}>
            <button 
              className={styles.backButton}
              onClick={() => setSelectedBatch(null)}
            >
              ← 
            </button>
            <button
              className={styles.deleteBatchButton}
              onClick={() => handleDeleteBatch(selectedBatch)}
            >
              Delete Batch
            </button>
          </div>
          
          <h2>BATCH {selectedBatch} GRADUATES</h2>
          
          <div className={styles.importForm}>
            <div className={styles.formGroup}>
              <label htmlFor="file">Import CSV File</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  id="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                <label 
                  htmlFor="file" 
                  className={styles.fileInputButton}
                >
                  {uploadedFile ? uploadedFile.name : 'Choose File'}
                </label>
              </div>
              <button onClick={handleUpload} disabled={!uploadedFile} className={styles.uploadButton}>
                Upload
              </button>
            </div>
          </div>
          
          <div className={styles.graduateListStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Graduates:</span>
              <span className={styles.statValue}>
                {graduates.filter(grad => grad.year_graduated === selectedBatch).length}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Imported Date:</span>
              <span className={styles.statValue}>
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className={styles.uploadedList}>
            <h3>Uploaded Graduates</h3>
            <table className={styles.graduatesTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>College</th>
                  <th>Program</th>
                  <th>Year Graduated</th>
                </tr>
              </thead>
              <tbody>
              {graduates.filter(grad => grad.gradYear === selectedBatch).length > 0 ? (
                  graduates
                    .filter(grad => grad.gradYear === selectedBatch) // ✅ Fix `gradYear`
                    .map((grad, index) => (
                      <tr key={index}>
                        <td>{`${grad.firstName} ${grad.middleName !== "N/A" ? grad.middleName : ""} ${grad.lastName}`.trim()}</td>
                        <td>{grad.contact}</td>
                        <td>{grad.college}</td>
                        <td>{grad.course}</td>
                        <td>{grad.gradYear}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5">No graduates uploaded yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default GraduatesList;