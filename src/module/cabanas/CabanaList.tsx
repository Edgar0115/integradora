import React, { useState } from "react";
import CabanaCard from "./CabanaCard";
import cabaña1 from "../../assets/cabaña1.jpg";
import cabaña2 from "../../assets/cabaña2.jpg";
import cabaña3 from "../../assets/cabaña3.jpg";
import AdminMenu from "../../components/AdminMenu";
import "./cabanas.css";

type Cabana = {
  img: string;
  nombre: string;
  descripcion: string;
  precio: number;
  activo: boolean;
};

const CabanaList = () => {
  // Inicializa con las cabañas y un estado activo por defecto (true)
  const [cabanas, setCabanas] = useState<Cabana[]>([
    { img: cabaña1, nombre: "Cabaña del Bosque", descripcion: "Conecta con la naturaleza rodeado de árboles.", precio: 1500, activo: true },
    { img: cabaña2, nombre: "Cabaña del Lago", descripcion: "Hermosa vista al lago y aire fresco.", precio: 1800, activo: true },
    { img: cabaña3, nombre: "Cabaña de Montaña", descripcion: "Ideal para aventuras y caminatas en la montaña.", precio: 2000, activo: true },
  ]);

  // Función para cambiar estado activo/inactivo
  const toggleActivo = (nombre: string) => {
    setCabanas(cabanas.map(c =>
      c.nombre === nombre ? { ...c, activo: !c.activo } : c
    ));
  };

  return (
    <div className="admin-view">
      <header style={{ position: "relative" }}>
        <h1>Cabañas</h1>
        <AdminMenu isLoggedIn={false} onLogout={() => {}} />
      </header>

      <section className="contenedor">
        {cabanas.map((c, index) => (
          <CabanaCard
            key={index}
            imgSrc={c.img}
            nombre={c.nombre}
            descripcion={c.descripcion}
            precio={c.precio}
            activo={c.activo}
            onToggleActivo={() => toggleActivo(c.nombre)}
          />
        ))}
      </section>
    </div>
  );
};

export default CabanaList;
