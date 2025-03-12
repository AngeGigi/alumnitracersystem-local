import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateSurvey.module.css";
import { TracerSurvey2 } from "./TracerSurvey2"; // Import TracerSurvey2 Component

export const CreateSurvey = ({ onBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [viewTracerSurvey, setViewTracerSurvey] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", questionType: "", options: [] }]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const updateOptions = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || questions.length === 0) {
      alert("Title and at least one question are required.");
      return;
    }

    try {
      const response = await axios.post("http://alumnitracersystem.onrender.com/api/surveys/create", {
        title,
        description,
        questions
      });

      alert("Survey created successfully!");
      setTitle("");
      setDescription("");
      setQuestions([]);
      onBack(); // Navigate back to the survey list
    } catch (error) {
      console.error("Error creating survey:", error);
      alert("Failed to create survey.");
    }
  };

  return (
    <div>
      {viewTracerSurvey ? (
        <TracerSurvey2 onBack={() => setViewTracerSurvey(false)} />
      ) : (
        <div className={styles.createSurvey}>
          
          {/* Buttons Row */}
          <div className={styles.buttonRow}>
            <button className={styles.backButton} onClick={onBack}>
              Back
            </button>
            <button className={styles.tracerSurveyButton} onClick={() => setViewTracerSurvey(true)}>
              OPEN TRACER SURVEY II
            </button>
          </div>

          <h1 className={styles.title}>Create New Survey</h1>
      <input
        type="text"
        placeholder="Survey Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Survey Description"
        className={styles.input}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.form}>
        {questions.map((question, index) => (
          <div key={index} className={styles.questionBox}>
            <input
              type="text"
              placeholder="Enter your question"
              className={styles.questionInput}
              value={question.questionText}
              onChange={(e) => updateQuestion(index, "questionText", e.target.value)}
            />
            <select
              className={styles.selectType}
              value={question.questionType}
              onChange={(e) => updateQuestion(index, "questionType", e.target.value)}
            >
              <option value="" disabled>Select Question Type</option>
              <option value="text">Short Answer</option>
              <option value="multiple-choice">Multiple Choice</option>
            </select>

            {question.questionType === "multiple-choice" && (
              <div className={styles.multipleChoice}>
                {question.options.map((option, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) => updateOptions(index, optIndex, e.target.value)}
                  />
                ))}
                <button className={styles.addOptionButton} onClick={() => addOption(index)}>
                  Add Option
                </button>



















              </div>
            )}

            <button className={styles.removeButton} onClick={() => removeQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}
        <button className={styles.addButton} onClick={addQuestion}>
          + Add Question
        </button>
      </div>
      <button className={styles.submitButton} onClick={handleSubmit}>
        Submit Survey
      </button>
        </div>
      )}
    </div>
  );
};
