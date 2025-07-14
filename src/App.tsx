import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VerPago from "./module/payments/VerPago";
import CabanasPage from "./module/cabanas/CabanaList";
import Reservaciones from "./module/Reservas/Reservaciones";
import LoginAdmin from "./module/loginAdmin/LoginAdmin";
import AdminMenu from "./components/AdminMenu";
import Loader from "./components/Loader";
import "./App.css";
import CrearCabaña from './module/cabanas/crearCabaña';
import VerReseñas from "./module/Reseñas/VerReseñas";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-content">
      {/* Mostrar menú sólo si está logueado */}
      <AdminMenu isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        {/* Si no está logueado, siempre mostrar LoginAdmin */}
        {!isLoggedIn && (
          <Route path="*" element={<LoginAdmin onLoginSuccess={handleLoginSuccess} />} />
        )}

        {/* Rutas protegidas */}
        {isLoggedIn && (
          <>
            <Route path="/" element={<CabanasPage />} />
            <Route path="/pagos" element={<VerPago />} />
            <Route path="/reservas" element={<Reservaciones />} />
            <Route path="/agregar-cabana" element={<CrearCabaña />} />
            <Route path="/resenas" element={<VerReseñas />} />
            {/* Redirigir cualquier ruta desconocida a "/" */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
