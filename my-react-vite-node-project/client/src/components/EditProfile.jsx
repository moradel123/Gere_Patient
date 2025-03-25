import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const EditProfile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        tel: "",
        address: "",
        cin: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost/api/getUser.php", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost/api/updateUser.php", user)
            .then(response => {
                alert(response.data.message);
                navigate("/profile");
            })
            .catch(error => console.error("Erreur lors de la mise à jour :", error));
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
            <div className="container mt-5" style={{ paddingTop: "80px" }}>
                <h2 className="text-center">Modifier Profil</h2>
                <form onSubmit={handleSubmit} className="card p-4">
                    <label>Nom :</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control mb-2" />
                    
                    <label>Email :</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control mb-2" />
                    
                    <label>Téléphone :</label>
                    <input type="text" name="tel" value={user.tel} onChange={handleChange} className="form-control mb-2" />
                    
                    <label>Adresse :</label>
                    <input type="text" name="address" value={user.address} onChange={handleChange} className="form-control mb-2" />
                    
                    <label>CIN :</label>
                    <input type="text" name="cin" value={user.cin} onChange={handleChange} className="form-control mb-2" />
                    
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
