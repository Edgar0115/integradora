import "./VerPago.css";
import { Link } from "react-router-dom";

const pagos = [
  { cliente: "Ana López", cabana: "Cabaña del Bosque", fecha: "2025-06-01", monto: 3000, metodo: "Tarjeta", estado: "Pagado" },
  { cliente: "Jorge Pérez", cabana: "Cabaña del Lago", fecha: "2025-06-03", monto: 3600, metodo: "Transferencia", estado: "Pagado" },
  { cliente: "María Gómez", cabana: "Cabaña de Montaña", fecha: "2025-06-05", monto: 4000, metodo: "Efectivo", estado: "Pagado" },
  { cliente: "Carlos Ruiz", cabana: "Cabaña del Bosque", fecha: "2025-06-07", monto: 1500, metodo: "Tarjeta", estado: "Pendiente" },
  { cliente: "Lucía Fernández", cabana: "Cabaña del Lago", fecha: "2025-06-08", monto: 1800, metodo: "Tarjeta", estado: "Pagado" },
];

const VerPago = () => {
  return (
    <div>
      <header>
        <Link to="/" className="btn-regresar">← Inicio</Link>
        <h1>Pagos Realizados</h1>
        <div className="user-admin">Admin</div>
      </header>

      <main>
        <h2>Listado de Pagos</h2>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Cabaña</th>
              <th>Fecha de Pago</th>
              <th>Monto (MXN)</th>
              <th>Método de Pago</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago, index) => (
              <tr key={index}>
                <td>{pago.cliente}</td>
                <td>{pago.cabana}</td>
                <td>{pago.fecha}</td>
                <td>${pago.monto.toLocaleString()}</td>
                <td>{pago.metodo}</td>
                <td className={pago.estado === "Pagado" ? "pagado" : "pendiente"}>
                  {pago.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/" className="volver">Volver a Inicio</Link>
      </main>
    </div>
  );
};

export default VerPago;
