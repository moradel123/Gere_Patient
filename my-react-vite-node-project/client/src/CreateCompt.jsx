import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateCompt = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        tel: "",
        address: "",
        cin: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = "Le nom ne doit contenir que des lettres.";
        }

        if (!/^\d{10}$/.test(formData.tel)) {
            newErrors.tel = "Le téléphone doit contenir exactement 10 chiffres.";
        }

        if (!/^\d{8}$/.test(formData.cin)) {
            newErrors.cin = "Le CIN doit contenir exactement 8 chiffres.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost/api/register.php",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            alert(response.data.message);
            navigate("/login");
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            const errorMessage = error.response?.data?.message || "Une erreur s'est produite lors de l'inscription.";
            alert(errorMessage);
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="overlay"></div>
            <div className="card p-4 shadow-lg" style={{ width: "400px", position: "relative", zIndex: 1, background: "transparent", borderRadius: "30px" }}>
                <h2 className="text-center text-success">Créer un compte</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Téléphone</label>
                        <input
                            type="text"
                            className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                            onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                            required
                        />
                        {errors.tel && <div className="invalid-feedback">{errors.tel}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Adresse</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CIN</label>
                        <input
                            type="text"
                            className={`form-control ${errors.cin ? "is-invalid" : ""}`}
                            onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                            required
                        />
                        {errors.cin && <div className="invalid-feedback">{errors.cin}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        S'inscrire
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Déjà un compte ?{" "}
                    <a href="/" className="text-success">
                        Se connecter
                    </a>
                </p>
            </div>
        </div>
    );
};

export default CreateCompt;