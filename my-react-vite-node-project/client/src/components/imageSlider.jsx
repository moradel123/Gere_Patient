import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Ensure you have the corresponding CSS file

const ImageSlider = () => {
    const images = [
        "/picture1.jpg",
        "/picture2.jpg",
        "/picture3.jpg",
        "/picture4.jpg",
        "/picture5.jpg",
    ];

    const messages = [
        "Bienvenus a IMA ZAGORA-FUTURE!",
        "Nous sommes ravis de vous accueillir.",
        "Des soins d'exellence une equipe a votre ecoute.",
        "Votre sante est notre priorite.",
        "Nous somemes la pour vous !"
    ];

    const [index, setIndex] = useState(0); // Garde l'index de l'image actuelle
    const [messageIndex, setMessageIndex] = useState(0); // Garde l'index du message actuel

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
            setMessageIndex((prevMessageIndex) => (prevMessageIndex + 1) % messages.length);
        }, 5000); // Change d'image et de message toutes les 5 secondes

        return () => clearInterval(interval); // Nettoie l'intervalle quand le composant se démonte
    }, []);

    return (
        <div className="slider-container">
            <div className="background-slider" style={{ backgroundImage: `url(${images[index]})` }}>
                <div className="slider-text fade-in-out">
                    <h1>{messages[messageIndex]}</h1>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;