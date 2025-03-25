import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BsMoon, BsSun } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "./TakeAppointment.css";

const TakeAppointment = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("diabetiques");
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showAppointmentsButton, setShowAppointmentsButton] = useState(false);
  const navigate = useNavigate();

  // Activer le mode sombre
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  // Récupérer la date d'aujourd'hui
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Effet pour gérer l'animation
  useEffect(() => {
    document.body.classList.add("animate__animated", "animate__fadeIn");
    return () => document.body.classList.remove("animate__animated", "animate__fadeIn");
  }, []);

  // Générer les créneaux horaires de 8h à 18h avec un intervalle de 30 minutes
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Effet pour récupérer les créneaux disponibles
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch("http://localhost/api/get-available-slots.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, location }),
        });
        const data = await response.json();
        if (response.ok) setSlots(data.slots);
        else setError(data.message);
      } catch (err) {
        setError("Erreur lors de la récupération des créneaux horaires.");
      }
    };
    if (date && location) fetchSlots();
  }, [date, location]);

  // Fonction pour confirmer un rendez-vous
  const confirmAppointment = async () => {
    if (!selectedTime) return setError("Veuillez sélectionner un horaire.");
    try {
      const response = await fetch("http://localhost/api/take-appointment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time: selectedTime, location }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setShowAppointmentsButton(true);
      } else setError(data.message);
    } catch (err) {
      setError("Erreur lors de la confirmation du rendez-vous.");
    }
  };

  return (
    <>
  <Navbar bg="light" variant="light" expand="lg" fixed="top">

        <Container>
          <Navbar.Brand href="/dashboard">Tableau de bord</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/profile")}>Voir mon profil</Nav.Link>
              <Nav.Link onClick={() => navigate("/take-appointment")}>Prendre un rendez-vous</Nav.Link>
              <Nav.Link onClick={() => navigate("/AppointmentsList")}>List_RDV</Nav.Link>
              <Nav.Link onClick={toggleDarkMode} className="ms-3">
                {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container py-5 animate__animated animate__fadeIn">
        <h2 className="text-center mb-4 " style={{ paddingTop: "80px" }}>Réserver un Rendez-vous</h2>
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              min={getTodayDate()}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="location" className="form-label">Lieu</label>
            <select
              className="form-control"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="diabetiques">Diabétiques</option>
              <option value="scanner">Scanner</option>
              <option value="maladie de coeur">Maladie des cœurs</option>
            </select>
          </div>
        </div>
        {error && <div className="alert alert-danger fade show">{error}</div>}
        {success && <div className="alert alert-success fade show">{success}</div>}
        {date && (
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="time" className="form-label">Sélectionnez un créneau horaire</label>
              <select
                className="form-control"
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Choisissez un horaire</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {selectedTime && (
          <div className="mt-4 text-center animate__animated animate__fadeInUp">
            <p className="mb-2">Heure sélectionnée : <strong>{selectedTime}</strong></p>
            <button className="btn btn-success" onClick={confirmAppointment}>
              Confirmer
            </button>
            {showAppointmentsButton && (
              <button
                className="btn btn-primary ms-3"
                onClick={() => navigate("/AppointmentsList")}
              >
                Voir les rendez-vous
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TakeAppointment;