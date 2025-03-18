import React, { useState, useEffect } from "react";
import styles from "./events.module.css"; // Import the CSS module
import Header from "../Header/header";
import Footer from "../FooterClient/Footer";

function Events() {
  return (
    <div>
      <Header />
      <EventMainPage />
      <Footer />
    </div>
  );
}

function EventMainPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from backend API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://localhost:5050/event/list"); // Adjust URL if needed
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className={styles.eventsContainer}>
      <h4>UPCOMING EVENTS</h4>
      {events.length > 0 ? (
        events.map((event, index) => (
          <div
            key={index}
            className={styles.eventNo1}
            onClick={() => handleEventClick(event)}
          >
            <div className={styles.eventDate}>
              <h3>{new Date(event.date).toLocaleString("default", { month: "long" })}</h3>
              <h3>{new Date(event.date).getDate()}</h3>
            </div>
            <div className={styles.eventDetails}>
              <h5>
                {event.time} in {event.venue}
              </h5>
              <h3>{event.title}</h3>
              <h5>
                {event.description.length > 100
                  ? `${event.description.substring(0, 100)}...`
                  : event.description}
              </h5>
            </div>
          </div>
        ))
      ) : (
        <p>No events available at the moment.</p>
      )}

      {/* Modal */}
      {selectedEvent && (
        <div className={styles.eventModal}>
          <div className={styles.eventModalContent}>
            <span className={styles.closeButton} onClick={closeModal}>
              &times;
            </span>
            {selectedEvent.image && (
              <img
                src={`https://localhost:5050/uploads/${selectedEvent.image}`}
                alt={selectedEvent.title}
                className={styles.eventPoster}
              />
            )}
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            <div className={styles.dateTimeVenue}>
              <p>
                <strong>Date & Time:</strong> <br />{selectedEvent.date} at {selectedEvent.time}
              </p>
              <p>
                <strong>Location:</strong> <br />{selectedEvent.venue}
              </p>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
