import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Viewevent = () => {
  const { id } = useParams(); // Récupérer l'ID de l'URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null); // Stocker les détails de l'événement
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/gestionevennt/webapi/events/${id}`);
        setEvent(response.data); // Charger les données de l'événement
      } catch (err) {
        setError("Erreur lors du chargement de l'événement");
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await axios.delete(`http://localhost:8083/gestionevennt/webapi/events/${id}/remove`);
        navigate("/events"); // Retour à la liste des événements
      } catch (err) {
        setError("Erreur lors de la suppression de l'événement");
        console.error(err);
      }
    }
  };

  const handleBack = () => {
    navigate(-1); // Retour à la page précédente
  };

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!event) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Détails de l'événement</h2>
      <div className="event-details">
        <h3>{event.name}</h3>
        <p><strong>Description :</strong> {event.description}</p>
        <p><strong>Date :</strong> {event.date}</p>
        <p><strong>Heure :</strong> {event.time}</p>
        <div className="event-actions">
          <button className="btn btn-warning me-2" onClick={() => navigate(`/event/edit/${event.id}`)}><i class="fa-solid fa-pen-to-square"></i>&nbsp;
            Modifier
          </button>
          <button className="btn btn-danger me-2" onClick={handleDelete}><i class="fa-solid fa-trash"></i>&nbsp;
            Supprimer
          </button>
          <button className="btn btn-secondary" onClick={handleBack}><i className="fas fa-arrow-left"></i>&nbsp;
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewevent;
