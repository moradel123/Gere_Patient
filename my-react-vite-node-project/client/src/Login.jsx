import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost/api/login.php",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/dashboard");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Erreur de connexion !");
            console.error(error);
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="overlay"></div>
            <div className="card p-4 shadow-lg" style={{ width: "400px", position: "relative", zIndex: 1, background: "transparent", borderRadius: "30px" }}>
                <h2 className="text-center text-primary">Connexion</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Se connecter
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Pas encore de compte ?{" "}
                    <a href="/register" className="text-primary">
                        S'inscrire
                    </a>
                </p>
                <p className="mt-3 text-center">
                    <a href="/forgot-password" className="text-primary">
                        Mot de passe oublié ?
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;