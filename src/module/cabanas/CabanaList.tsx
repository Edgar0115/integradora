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
  habitaciones: number;
  banos: number;
  capacidad: number;
  activo: boolean;
};

const CabanaList: React.FC = () => {
  const [cabanas, setCabanas] = useState<Cabana[]>([
    {
      img: cabaña1,
      nombre: "Cabaña del Bosque",
      descripcion: "Conecta con la naturaleza rodeado de árboles.",
      precio: 1500,
      habitaciones: 3,
      banos: 2,
      capacidad: 6,
      activo: true,
    },
    {
      img: cabaña2,
      nombre: "Cabaña del Lago",
      descripcion: "Hermosa vista al lago y aire fresco.",
      precio: 1800,
      habitaciones: 2,
      banos: 1,
      capacidad: 4,
      activo: true,
    },
    {
      img: cabaña3,
      nombre: "Cabaña de Montaña",
      descripcion: "Ideal para aventuras y caminatas en la montaña.",
      precio: 2000,
      habitaciones: 4,
      banos: 3,
      capacidad: 8,
      activo: true,
    },
  ]);

  const toggleActivo = (nombre: string) => {
    setCabanas((prevCabanas) =>
      prevCabanas.map((c) =>
        c.nombre === nombre ? { ...c, activo: !c.activo } : c
      )
    );
  };

  const actualizarCabana = (
    nombreOriginal: string,
    datosActualizados: Omit<Cabana, "activo" | "nombre">
  ) => {
    setCabanas((prevCabanas) =>
      prevCabanas.map((c) =>
        c.nombre === nombreOriginal ? { ...c, ...datosActualizados } : c
      )
    );
  };

  return (
    <div className="admin-cabanas-view">
      <div className="admin-cabanas-content">
        <header className="admin-cabanas-header">
          <h1>Cabañas</h1>
          <AdminMenu isLoggedIn={false} onLogout={() => {}} />
        </header>

        <section className="admin-cabanas-grid">
          {cabanas.map((cabaña, index) => (
            <CabanaCard
              key={index}
              imgSrc={cabaña.img}
              nombre={cabaña.nombre}
              descripcion={cabaña.descripcion}
              precio={cabaña.precio}
              habitaciones={cabaña.habitaciones}
              banos={cabaña.banos}
              capacidad={cabaña.capacidad}
              activo={cabaña.activo}
              onToggleActivo={() => toggleActivo(cabaña.nombre)}
              onUpdate={(datosActualizados) =>
                actualizarCabana(cabaña.nombre, datosActualizados)
              }
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default CabanaList;
