import React, { useEffect, useState } from "react";
import "./Animation.css"; // Assurez-vous que le CSS est importé

interface AnimationProps {
  onFinish: () => void;
}

const Animation: React.FC<AnimationProps> = ({ onFinish }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Définir le délai de 6 secondes avant de changer l'interface
    const timer = setTimeout(() => {
      setIsLoaded(true); // L'animation est terminée après 6 secondes
      onFinish(); // Appelez la fonction onFinish après 6s
    }, 6000);

    return () => clearTimeout(timer); // Assurez-vous de nettoyer le timer
  }, [onFinish]);

  // Crée des étoiles aléatoires
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const left = Math.random() * 100 + "vw";
      const top = Math.random() * 100 + "vh";
      stars.push(<div className="star" style={{ left, top }} key={i}></div>);
    }
    return stars;
  };

  // Positionner les cercles animés de manière aléatoire
  const createCircles = () => {
    const circles = [];
    for (let i = 0; i < 5; i++) {
      const left = Math.random() * 100 + "vw";
      const top = Math.random() * 100 + "vh";
      circles.push(
        <div
          className="circle"
          style={{
            left: left,
            top: top,
            animationDelay: `${Math.random() * 6}s`, // Chaque cercle peut démarrer à un moment différent
          }}
          key={i}
        ></div>
      );
    }
    return circles;
  };

  return (
    <div className="loading-container">
      <div className="loading-content">
        <span>Nous vous préparons l'interface...</span>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
      </div>

      {/* Ajouter les étoiles au fond */}
      <div className="stars">{createStars()}</div>

      {/* Ajouter des cercles animés */}
      {createCircles()}
    </div>
  );
};

export default Animation;
