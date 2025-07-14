import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./crearCabaña.css";

const serviciosDisponibles = [
  "Wi-Fi",
  "Aire acondicionado",
  "Chimenea",
  "TV",
  "Cocina equipada",
  "Estacionamiento",
];

const CrearCabaña: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [habitaciones, setHabitaciones] = useState(1);
  const [banos, setBanos] = useState(1);
  const [permiteMascotas, setPermiteMascotas] = useState(false);
  const [servicios, setServicios] = useState<string[]>([]);
  const [fotos, setFotos] = useState<FileList | null>(null);

  const navigate = useNavigate();

  const handleServicioChange = (servicio: string) => {
    setServicios((prev) =>
      prev.includes(servicio)
        ? prev.filter((s) => s !== servicio)
        : [...prev, servicio]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("estado", estado);
    formData.append("habitaciones", habitaciones.toString());
    formData.append("banos", banos.toString());
    formData.append("permiteMascotas", permiteMascotas ? "true" : "false");

    servicios.forEach((servicio, index) => {
      formData.append(`servicios[${index}]`, servicio);
    });

    if (fotos) {
      Array.from(fotos).forEach((foto) => {
        formData.append("fotos", foto);
      });
    }

    try {
      const response = await fetch("http://localhost:4000/api/cabanas", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al guardar la cabaña");

      const data = await response.json();
      console.log("Cabaña guardada:", data);
      alert("Cabaña guardada correctamente.");
      // navigate("/admin");
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar la cabaña.");
    }
  };

  return (
    <div className="crear-cabana-container">
      <h2>Agregar Nueva Cabaña</h2>

      {/* Botón de regresar */}
<button className="btn btn-volver" onClick={() => navigate("/admin")}>
  ← Regresar
</button>


      <form onSubmit={handleSubmit} className="crear-cabana-form">
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>

        <label>
          Estado:
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
          </select>
        </label>

        <label>
          Habitaciones:
          <input
            type="number"
            value={habitaciones}
            min="1"
            onChange={(e) => setHabitaciones(parseInt(e.target.value))}
          />
        </label>

        <label>
          Baños:
          <input
            type="number"
            value={banos}
            min="1"
            onChange={(e) => setBanos(parseInt(e.target.value))}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={permiteMascotas}
            onChange={(e) => setPermiteMascotas(e.target.checked)}
          />
          ¿Permite mascotas?
        </label>

        <div className="servicios-container">
          <label>Servicios incluidos:</label>
          <div className="servicios-lista">
            {serviciosDisponibles.map((servicio) => (
              <label key={servicio} className="checkbox">
                <input
                  type="checkbox"
                  checked={servicios.includes(servicio)}
                  onChange={() => handleServicioChange(servicio)}
                />
                {servicio}
              </label>
            ))}
          </div>
        </div>

        <label>
          Fotos:
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFotos(e.target.files)}
          />
        </label>

        <button type="submit" className="btn btn-guardar">
  Guardar Cabaña
</button>
        <button type="button" className="btn btn-cancelar" onClick={() => navigate("/admin")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CrearCabaña;
