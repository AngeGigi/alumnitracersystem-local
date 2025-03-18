import React, { useEffect, useState } from "react";
import styles from "./ArticleClient.module.css";

function ArticleClient() {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://localhost:5050/artcileroutes/");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  // Open the modal with selected article
  const openArticleModal = (article) => {
    setSelectedArticle(article);
  };

  // Close the modal
  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className={styles.articleContainer}>
      <div className={styles.sectionTitle}>
        <h1>Articles</h1>
        <hr />
      </div>
      {news.length === 0 ? (
        <p className={styles.noArticleMessage}>No articles to display</p>
      ) : (
        <div className={styles.articleGrid}>
          {news.map((item) => (
            <div
              key={item._id}
              className={styles.articleBox}
              onClick={() => openArticleModal(item)}
            >
              <img
                src={`https://localhost:5050${item.image}`}
                alt={item.title}
                className={styles.articleImage}
              />
              <div className={styles.articleText}>
                <h3>{item.title}</h3>
                <span className={styles.articleDate}>
                    {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedArticle && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeArticleModal}>
              &times;
            </button>
            <h2>{selectedArticle.title}</h2>
            <img
              src={`https://localhost:5050${selectedArticle.image}`}
              alt={selectedArticle.title}
              className={styles.fullArticleImage}
            />
            <p>{selectedArticle.content}</p>
            <small>
              Published on {new Date(selectedArticle.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleClient;
