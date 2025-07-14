import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerReseñas.css";

interface Reseña {
  id: string;
  usuario: string;
  comentario: string;
  fecha: string;
  puntuacion: number;
  cabanaNombre: string;
}

const VerReseñas: React.FC = () => {
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerReseñas = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/resenas");
        if (!response.ok) throw new Error("Error al cargar las reseñas");

        const data = await response.json();
        setReseñas(data);
      } catch (err: any) {
        console.warn("No se pudieron cargar las reseñas del backend. Usando datos de prueba.");
        setReseñas([
          {
            id: "1",
            usuario: "Juan Pérez",
            comentario: "Muy cómoda y limpia. Volvería sin dudar.",
            fecha: "2025-07-01",
            puntuacion: 5,
            cabanaNombre: "Cabaña del Bosque",
          },
          {
            id: "2",
            usuario: "Ana Gómez",
            comentario: "Hermosa vista, pero el Wi-Fi no funcionaba bien.",
            fecha: "2025-06-28",
            puntuacion: 3,
            cabanaNombre: "Cabaña Vista Lago",
          },
          {
            id: "3",
            usuario: "Carlos Díaz",
            comentario: "Ideal para desconectar. Muy tranquilo todo.",
            fecha: "2025-06-15",
            puntuacion: 4,
            cabanaNombre: "Cabaña Bosque Encantado",
          },
        ]);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    obtenerReseñas();
  }, []);

  const handleEliminarResena = async (id: string) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta reseña?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:4000/api/resenas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("No se pudo eliminar la reseña");

      // Eliminar del estado
      setReseñas(prev => prev.filter(resena => resena.id !== id));
    } catch (err) {
      alert("Error al eliminar la reseña");
      console.error(err);
    }
  };

  return (
    <div className="reseñas-container">
      <h2>Reseñas de Usuarios</h2>

      <button className="btn-volver" onClick={() => navigate("/")}>
        ← Volver al Inicio
      </button>

      {loading && <p>Cargando reseñas...</p>}
      {error && <p className="error">{error}</p>}

      <div className="reseñas-lista">
        {reseñas.map((resena) => (
          <div key={resena.id} className="reseña-card">
            <div className="reseña-usuario">
              <strong>{resena.usuario}</strong>
              <span className="reseña-fecha">{new Date(resena.fecha).toLocaleDateString()}</span>
              <div className="reseña-cabana">🏡 {resena.cabanaNombre}</div>
            </div>
            <div className="reseña-comentario">{resena.comentario}</div>
            <div className="reseña-puntuacion">
              {"⭐".repeat(resena.puntuacion)}{" "}
              {"☆".repeat(5 - resena.puntuacion)}
            </div>
            <button
              className="btn-eliminar"
              onClick={() => handleEliminarResena(resena.id)}
            >
              🗑 Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerReseñas;
