import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import SideBarre from "./admin/sideBarre";
import HomeAdmin from "./admin/HomeAdmin";
import Support from './admin/contact.tsx';
import Yassine from './admin/yassine.tsx';
import Animation from "./admin/Animation.tsx"; // Importer le fichier Animation.tsx

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai pour l'animation de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000); // 3 secondes de chargement

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route pour Login sans Sidebar */}
        <Route path="/" element={<Login />} />

        {/* Si l'interface est prête, afficher les routes Admin */}
        {isLoading ? (
          <Route path="/admin/*" element={<Animation onFinish={() => setIsLoading(false)} />} />
        ) : (
          <Route path="/admin/*" element={<SidebarAdmin />} />
        )}

        {/* Routes supplémentaires */}
        <Route path="/Caissier/*" element={<SideBarreCaissier />} />
      </Routes>
    </BrowserRouter>
  );
}

function SidebarAdmin() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBarre />
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Affichage de la route principale ici */}
        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/contact" element={<Support />} />
          <Route path="/yassine" element={<Yassine />} />
        </Routes>
      </div>
    </div>
  );
}

function SideBarreCaissier() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBarre />
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Affichage de la route principale ici */}
        <Routes>
          <Route path="/" element={<HomeAdmin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
