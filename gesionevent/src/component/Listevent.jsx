import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Eventlist = () => {
  const [events, setEvents] = useState([]); // Liste des événements
  const [error, setError] = useState(null); // Gestion des erreurs

  // Charger les événements
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8083/gestionevennt/webapi/events");
      setEvents(response.data); // Mettre à jour la liste des événements
    } catch (err) {
      setError("Erreur lors du chargement des événements");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Supprimer un événement
  const deleteEvent = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await axios.delete(`http://localhost:8083/gestionevennt/webapi/events/${id}/remove`);
        // Mise à jour de la liste après suppression
        setEvents(events.filter((event) => event.id !== id));
      } catch (err) {
        setError("Erreur lors de la suppression de l'événement");
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Liste des événements</h1>
      <Link to="/event/add" className="btn btn-primary mb-3"><i class="fa-regular fa-plus"></i>&nbsp;
        Ajouter un événement
      </Link>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td className="d-flex align-items-center">
                <Link to={`/event/view/${event.id}`} className="btn btn-info btn-sm me-2"><i class="fa-duotone fa-solid fa-circle-info"></i>&nbsp;Voir</Link>
               <Link to={`/event/edit/${event.id}`} className="btn btn-warning btn-sm me-2"><i class="fa-solid fa-pen-to-square"></i>&nbsp;Modifier</Link>
               <button onClick={() => deleteEvent(event.id)} className="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i>&nbsp;Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Eventlist;
