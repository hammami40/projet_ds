import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Insertevent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:8083/gestionevennt/webapi/events/create";
      await axios.post(apiUrl, eventData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Événement créé avec succès !");
      setEventData({
        id: "",
        name: "",
        description: "",
        date: "",
        time: "",
      });
    } catch (err) {
      setMessage("Erreur lors de la création de l'événement.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Créer un événement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">ID</label>
          <input
            type="text"
            name="id"
            id="id"
            className="form-control"
            value={eventData.id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={eventData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
            value={eventData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            className="form-control"
            value={eventData.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">Heure</label>
          <input
            type="time"
            name="time"
            id="time"
            className="form-control"
            value={eventData.time}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Créer</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/events')}
        >
          <i className="fas fa-arrow-left"></i> Annuler
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Insertevent;
