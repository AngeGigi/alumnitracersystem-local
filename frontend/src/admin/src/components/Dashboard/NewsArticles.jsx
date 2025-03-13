import React, { useEffect, useState } from "react";
import styles from "./NewsArticles.module.css";

export default function NewsArticles() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch articles
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://alumnitracersystem.onrender.com/artcileroutes/");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Submit form to add or update article
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const url = editId
        ? `http://alumnitracersystem.onrender.com/artcileroutes/update/${editId}`
        : "http://alumnitracersystem.onrender.com/artcileroutes/add";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTitle("");
        setContent("");
        setImage(null);
        setEditId(null);
        setShowFormModal(false);
        fetchArticles();
      } else {
        setMessage(data.message || "Error occurred");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to server");
    }
  };

  // Delete article
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://alumnitracersystem.onrender.com/artcileroutes/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchArticles();
      } else {
        setMessage(data.message || "Error occurred");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to server");
    }
  };

  // Edit article
  const handleEdit = (article) => {
    setTitle(article.title);
    setContent(article.content);
    setEditId(article._id);
    setShowFormModal(true);
  };

  // Open modal for full article
  const openArticleModal = (article) => {
    setSelectedArticle(article);
  };

  // Close modals
  const closeFormModal = () => {
    setShowFormModal(false);
    setEditId(null);
    setTitle("");
    setContent("");
    setImage(null);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className={styles.container}>
      <h1>MANAGE ARTICLES</h1>
      {message && <p className={styles.message}>{message}</p>}

      <button onClick={() => setShowFormModal(true)} className={styles.createButton}>
        + Create Article
      </button>

      <div className={styles.articlesGrid}>
        {articles.map((article) => (
            <div key={article._id} className={styles.articleBox}>
            <h3>{article.title}</h3>
            {article.image && (
                <img
                src={`http://alumnitracersystem.onrender.com${article.image}`}
                alt={article.title}
                className={styles.articleImage}
                />
            )}
            <p>{article.content.slice(0, 100)}...</p>
            <button
                className={styles.editButton}
                onClick={(e) => {
                e.stopPropagation();
                handleEdit(article);
                }}
            >
                Edit
            </button>
            <button
                className={styles.deleteButton}
                onClick={(e) => {
                e.stopPropagation();
                handleDelete(article._id);
                }}
            >
                Delete
            </button>
            </div>
        ))}
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeFormModal}>
              &times;
            </button>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                    id="title"
                    type="text"
                    className={styles.formInput}
                    placeholder="Enter article title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="content">Content</label>
                    <textarea
                    id="content"
                    className={styles.formTextarea}
                    placeholder="Enter article content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    ></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image">Image</label>
                    <input
                    id="image"
                    type="file"
                    className={styles.formFile}
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    {editId ? "Update Article" : "Add Article"}
                </button>
            </form>
          </div>
        </div>
      )}

      {/* Article Modal */}
        {selectedArticle && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeArticleModal}>
                &times;
            </button>
            <h2>{selectedArticle.title}</h2>
            {selectedArticle.image && (
                <img
                src={`http://alumnitracersystem.onrender.com${selectedArticle.image}`}
                alt={selectedArticle.title}
                className={styles.fullArticleImage}
                />
            )}
            <p>{selectedArticle.content}</p>
            
            <div className={styles.modalActions}>
                <button
                    className={styles.editButton}
                    onClick={() => {
                    handleEdit(selectedArticle);
                    closeArticleModal();
                    }}
                >
                    Edit
                </button>
                <button
                    className={styles.deleteButton}
                    onClick={() => {
                    handleDelete(selectedArticle._id);
                    closeArticleModal();
                    }}
                >
                    Delete
                </button>
                </div>

            </div>
        </div>
        )}
    </div>
  );
}
