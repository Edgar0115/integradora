import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminMenu.css";
import {
  FiMenu,
  FiHome,
  FiCreditCard,
  FiCalendar,
  FiLogOut
} from "react-icons/fi";

interface AdminMenuProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ isLoggedIn, onLogout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="hamburger-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Abrir/Cerrar menú admin"
      >
        <FiMenu size={24} />
      </button>

      {/* Menú lateral */}
      <div className={`admin-sidebar ${open ? "open" : ""}`}>
        <h2 className="admin-logo">ADMIN</h2>

        <nav className="admin-menu">
          <button className="admin-menu-item" onClick={() => handleNavigate("/cabanas")}>
            <FiHome className="admin-icon" />
            <span className="admin-text">Cabañas</span>
          </button>

          <button className="admin-menu-item" onClick={() => handleNavigate("/pagos")}>
            <FiCreditCard className="admin-icon" />
            <span className="admin-text">Pagos</span>
          </button>

          <button className="admin-menu-item" onClick={() => handleNavigate("/reservas")}>
            <FiCalendar className="admin-icon" />
            <span className="admin-text">Reservas</span>
          </button>

          <button
            className="admin-menu-item"
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
          >
            <FiLogOut className="admin-icon" />
            <span className="admin-text">Cerrar sesión</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default AdminMenu;
