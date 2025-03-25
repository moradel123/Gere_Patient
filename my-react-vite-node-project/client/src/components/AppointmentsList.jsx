import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppointmentsList.css";

const AppointmentsList = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [rendezVousSelectionne, setRendezVousSelectionne] = useState(null);
  const [afficherModal, setAfficherModal] = useState(false);
  const [nouvelleDate, setNouvelleDate] = useState("");
  const [nouveauTemps, setNouveauTemps] = useState("");
  const [nouveauLieu, setNouveauLieu] = useState("");
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");
  const navigate = useNavigate();

  // Générer les créneaux horaires
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

  // Récupérer la liste des rendez-vous
  useEffect(() => {
    const recupererRendezVous = async () => {
      try {
        const reponse = await fetch("http://localhost/api/get-appointments.php");
        const donnees = await reponse.json();
        if (reponse.ok) setRendezVous(donnees.appointments);
        else setErreur(donnees.message);
      } catch (err) {
        setErreur("Erreur lors de la récupération des rendez-vous.");
      }
    };
    recupererRendezVous();
  }, []);

  // Gérer la modification d'un rendez-vous
  const gererModification = (rendezVous) => {
    setRendezVousSelectionne(rendezVous);
    setNouvelleDate(rendezVous.date);
    setNouveauTemps(rendezVous.time);
    setNouveauLieu(rendezVous.location);
    setAfficherModal(true);
  };

  // Mettre à jour un rendez-vous
  const mettreAJourRendezVous = async () => {
    if (!nouvelleDate || !nouveauTemps || !nouveauLieu) return setErreur("Veuillez remplir tous les champs.");
    try {
      const reponse = await fetch("http://localhost/api/update-appointment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: rendezVousSelectionne.id,
          date: nouvelleDate,
          time: nouveauTemps,
          location: nouveauLieu,
        }),
      });
      const donnees = await reponse.json();
      if (reponse.ok) {
        setSucces(donnees.message);
        setAfficherModal(false);
        setRendezVous((prev) =>
          prev.map((rdv) =>
            rdv.id === rendezVousSelectionne.id
              ? { ...rdv, date: nouvelleDate, time: nouveauTemps, location: nouveauLieu }
              : rdv
          )
        );
      } else setErreur(donnees.message);
    } catch (err) {
      setErreur("Erreur lors de la mise à jour du rendez-vous.");
    }
  };

  // Supprimer un rendez-vous
  const supprimerRendezVous = async (id) => {
    try {
      const reponse = await fetch("http://localhost/api/delete-appointment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const donnees = await reponse.json();
      if (reponse.ok) {
        setSucces(donnees.message);
        setRendezVous((prev) => prev.filter((rdv) => rdv.id !== id));
      } else setErreur(donnees.message);
    } catch (err) {
      setErreur("Erreur lors de la suppression du rendez-vous.");
    }
  };

  // Vérifier si un rendez-vous est encore modifiable
  const isAppointmentEditable = (date, time) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime > now; // Le rendez-vous est modifiable s'il est dans le futur
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container py-5" >
        <h2 className="text-center mb-4"style={{ paddingTop: "80px" }}>Liste des rendez-vous</h2>
        {erreur && <div className="alert alert-danger fade show">{erreur}</div>}
        {succes && <div className="alert alert-success fade show">{succes}</div>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Lieu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rendezVous.map((rendezVous) => {
              const isEditable = isAppointmentEditable(rendezVous.date, rendezVous.time);
              return (
                <tr key={rendezVous.id}>
                  <td>{rendezVous.date}</td>
                  <td>{rendezVous.time}</td>
                  <td>{rendezVous.location}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => gererModification(rendezVous)}
                      disabled={!isEditable} // Désactiver le bouton si le rendez-vous n'est plus modifiable
                    >
                      Modifier
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => supprimerRendezVous(rendezVous.id)}
                      disabled={!isEditable} // Désactiver le bouton si le rendez-vous n'est plus modifiable
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Modal show={afficherModal} onHide={() => setAfficherModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le rendez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={nouvelleDate}
                onChange={(e) => setNouvelleDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Heure</Form.Label>
              <select
                className="form-control"
                value={nouveauTemps}
                onChange={(e) => setNouveauTemps(e.target.value)}
              >
                <option value="">Choisissez un horaire</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lieu</Form.Label>
              <Form.Control
                as="select"
                value={nouveauLieu}
                onChange={(e) => setNouveauLieu(e.target.value)}
              >
                <option value="diabetiques">Diabétiques</option>
                <option value="scanner">Scanner</option>
                <option value="maladie de coeur">Maladie des cœurs</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAfficherModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={mettreAJourRendezVous}>
            Enregistrer les modifications
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentsList;