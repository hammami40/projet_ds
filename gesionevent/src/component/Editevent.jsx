import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Editevent = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate(); // Pour naviguer entre les pages

  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
  });
  const [error, setError] = useState(''); // Gestion des erreurs
  const [success, setSuccess] = useState(false); // Gestion des succès

  useEffect(() => {
    loadEvent(); // Charger les données de l'événement au montage du composant
  }, []);

  const loadEvent = async () => {
    try {
      const result = await axios.get(`http://localhost:8083/gestionevennt/webapi/events/${id}`);
      setEvent(result.data);
    } catch (error) {
      console.error("Erreur lors du chargement de l'événement :", error);
      setError("Impossible de charger l'événement. Veuillez réessayer.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event.name || !event.description || !event.date || !event.time) {
      setError("Tous les champs doivent être remplis.");
      return;
    }
    try {
      await axios.put(`http://localhost:8083/gestionevennt/webapi/events/${id}`, event);
      setSuccess(true);
      navigate('/events');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement :", error);
      setError("Erreur lors de la mise à jour. Veuillez vérifier vos données.");
    }
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h2 className="text-center my-4">Modifier l'événement</h2>

      {error && <p className="text-danger text-center">{error}</p>}
      {success && <p className="text-success text-center">L'événement a été mis à jour avec succès !</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={event.name || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={event.description || ''}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={event.date || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Heure</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={event.time || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          <i className="fa-solid fa-floppy-disk"></i> Enregistrer les modifications
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/events')}
        >
          <i className="fas fa-arrow-left"></i> Annuler
        </button>
      </form>
    </div>
  );
};

export default Editevent;
