import React, { useEffect, useState } from "react";
import styles from "./ListofEvents.module.css";

export const ListOfEvents = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://alumnitracersystem.onrender.com/event/list");
      if (response.ok) {
        const data = await response.json();
        setEventList(data);
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

  const handleDeleteEvent = async (eventId) => {
    if (!eventId) {
      console.error("Invalid event ID.");
      return;
    }
  
    try {
      const response = await fetch(`http://alumnitracersystem.onrender.com/event/delete/${eventId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setEventList(eventList.filter((event) => event._id !== eventId)); // Use `_id` here
        console.log(`Event with ID ${eventId} deleted successfully.`);
      } else {
        console.error("Failed to delete event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };  

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className={styles.listOfEvents}>
      <h2 className={styles.title}>List of Events</h2>
      {eventList.length > 0 ? (
        <div className={styles.eventsGrid}>
          {eventList.map((event, index) => (
          <div key={event._id} className={styles.eventBox}>
            {event.image && (
              <img
                src={`http://alumnitracersystem.onrender.com/uploads/${event.image}`}
                alt={event.title}
                className={styles.eventImage}
                onClick={() => handleEventClick(event)}
              />
            )}
            <p>
              <strong>Date and Time:</strong> {event.date} at {event.time}
            </p>
            <h2>{event.title}</h2>
            <p>
              {event.description.length > 100
                ? event.description.substring(0, 100) + "..."
                : event.description}
            </p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteEvent(event._id)} // Use `_id` here
            >
              Delete
            </button>
          </div>
        ))}
        </div>
      ) : (
        <p className={styles.noEvents}>No events available. Please create one.</p>
      )}

      {/* Modal */}
      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            {selectedEvent.image && (
              <img
                src={`http://alumnitracersystem.onrender.com/uploads/${selectedEvent.image}`}
                alt={selectedEvent.title}
                className={styles.modalEventImage}
              />
            )}
            <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
            <div className={styles.modalDetails}>
            <div className={styles.dateTimeRow}>
                <p>
                  <strong>Date:</strong> <br />
                  {selectedEvent.date}
                </p>
                <p>
                  <strong>Time:</strong> <br />
                  {selectedEvent.time}
                </p>
              </div>
              <div className={styles.description2}>
                <p>
                  <strong>Description:</strong> <br />{selectedEvent.description}
                </p>
              </div>
              <div className={styles.venueSource}>
                <p>
                  <strong>Venue:</strong> <br />{selectedEvent.venue}
                </p>
                <p>
                  <strong>Source:</strong>{" "}
                  <a href={selectedEvent.source} target="_blank" rel="noopener noreferrer">
                    <br />Link
                  </a>
                </p>
              </div>
              <p>
                <strong>Participants ID:</strong> <br />{selectedEvent.participantsId}
              </p>
              <p>
                <strong>By:</strong> <br />{selectedEvent.by}
              </p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfEvents;
