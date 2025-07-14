import React, { useState } from "react";
import "./LoginAdmin.css";
import logo from "../../assets/Logo1.png"; // Asegúrate que el path sea correcto

interface LoginAdminProps {
  onLoginSuccess: () => void;
}

const LoginAdmin: React.FC<LoginAdminProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminUser = {
    username: "admin",
    password: "123",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === adminUser.username && password === adminUser.password) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <img src={logo} alt="Logo" className="admin-login-logo" />
        <h2 className="admin-login-title">Panel de Administración</h2>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="admin-login-error">{error}</p>}

          <button type="submit" className="admin-login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
