import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

// Styles avec styled-components
const ProfileContainer = styled.div`
    padding-top: 80px;
    max-width: 800px;
    margin: 0 auto;
`;

const ProfileCard = styled(animated.div)`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-top: 2rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ProfileButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Animation avec react-spring
    const cardAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(20px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: { tension: 200, friction: 20 },
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost/api/getUser.php", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        };
        fetchUser();
    }, []);

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
            <ProfileContainer>
                <h2 className="text-center">Mon Profil</h2>
                {user ? (
                    <ProfileCard style={ {textAlign: "center"}}>
                        <p><strong>Nom:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Téléphone:</strong> {user.tel}</p>
                        <p><strong>Adresse:</strong> {user.address}</p>
                        <p><strong>CIN:</strong> {user.cin}</p>
                        <ProfileButton onClick={() => navigate("/edit-profile")}>
                            Modifier Profil
                        </ProfileButton>
                    </ProfileCard>
                ) : (
                    <p>Chargement...</p>
                )}
            </ProfileContainer>
        </>
    );
};

export default Profile;