import React from "react";
import "./reservaciones.css";
import { Link } from "react-router-dom";

type Reservacion = {
  cliente: string;
  cabana: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "Confirmada" | "Pendiente" | "Cancelada";
};

const reservaciones: Reservacion[] = [
  { cliente: "Ana López", cabana: "Cabaña del Bosque", fechaInicio: "2025-07-10", fechaFin: "2025-07-12", estado: "Confirmada" },
  { cliente: "Jorge Pérez", cabana: "Cabaña del Lago", fechaInicio: "2025-07-15", fechaFin: "2025-07-17", estado: "Pendiente" },
  { cliente: "María Torres", cabana: "Cabaña de Montaña", fechaInicio: "2025-07-05", fechaFin: "2025-07-08", estado: "Confirmada" },
  { cliente: "Pedro Jiménez", cabana: "Cabaña del Lago", fechaInicio: "2025-07-11", fechaFin: "2025-07-14", estado: "Cancelada" },
  { cliente: "Laura Méndez", cabana: "Cabaña del Bosque", fechaInicio: "2025-07-20", fechaFin: "2025-07-22", estado: "Confirmada" },
  // ...otros
];

const Reservaciones: React.FC = () => {
  return (
    <div className="reservas-container">
      <header className="reservas-header">
        <Link to="/" className="btn-regresar">← Inicio</Link>
        <h1>Reservaciones</h1>
        <div className="user-admin">Admin</div>
      </header>

      <main className="reservas-main">
        <h2>Listado de reservaciones</h2>
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Cabaña</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservaciones.map((r, i) => (
              <tr key={i}>
                <td>{r.cliente}</td>
                <td>{r.cabana}</td>
                <td>{r.fechaInicio}</td>
                <td>{r.fechaFin}</td>
                <td className={
                  r.estado === "Confirmada" ? "estado-confirmada" :
                  r.estado === "Pendiente" ? "estado-pendiente" :
                  "estado-cancelada"
                }>
                  {r.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/" className="volver">Volver al inicio</Link>
      </main>
    </div>
  );
};

export default Reservaciones;
