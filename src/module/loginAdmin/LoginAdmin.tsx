import React, { useState } from "react";
import "./LoginAdmin.css";
import logo from "../../assets/Logo1.png"; // ajusta el path si es diferente

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
    <div className="login-container">
      <img src={logo} alt="Logo1" className="login-logo" />
      <h2>Login Admin</h2>
      <form onSubmit={handleSubmit}>
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

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginAdmin;
