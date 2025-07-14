import React, { useState, ChangeEvent, FormEvent } from "react";

type CabanaCardProps = {
  imgSrc: string;
  nombre: string;
  descripcion: string;
  precio: number;
  habitaciones: number;
  banos: number;
  capacidad: number;
  activo?: boolean;
  onToggleActivo?: () => void;
  onUpdate?: (data: {
    nombre: string;
    descripcion: string;
    precio: number;
    imgSrc: string;
    habitaciones: number;
    banos: number;
    capacidad: number;
  }) => void;
};

const CabanaCard = ({
  imgSrc,
  nombre,
  descripcion,
  precio,
  habitaciones,
  banos,
  capacidad,
  activo = true,
  onToggleActivo,
  onUpdate,
}: CabanaCardProps) => {
  const [isActivo, setIsActivo] = useState(activo);
  const [editMode, setEditMode] = useState(false);

  const [formNombre, setFormNombre] = useState(nombre);
  const [formDescripcion, setFormDescripcion] = useState(descripcion);
  const [formPrecio, setFormPrecio] = useState(precio);
  const [formImgSrc, setFormImgSrc] = useState(imgSrc);
  const [formHabitaciones, setFormHabitaciones] = useState(habitaciones);
  const [formBanos, setFormBanos] = useState(banos);
  const [formCapacidad, setFormCapacidad] = useState(capacidad);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFormImgSrc(url);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    if (onUpdate) {
      onUpdate({
        nombre: formNombre,
        descripcion: formDescripcion,
        precio: formPrecio,
        imgSrc: formImgSrc,
        habitaciones: formHabitaciones,
        banos: formBanos,
        capacidad: formCapacidad,
      });
    }
  };

  const toggleActivoLocal = () => {
    setIsActivo((prev) => !prev);
    if (onToggleActivo) onToggleActivo();
  };

  return (
    <div className={`admin-cabanas-card ${!isActivo ? "inactivo" : ""}`}>
      <img src={formImgSrc} alt={formNombre} />
      <div className="admin-cabanas-card-content">
        {editMode ? (
          <form onSubmit={handleSubmit} className="admin-cabanas-form">
            <label>
              Nombre:
              <input
                type="text"
                value={formNombre}
                onChange={(e) => setFormNombre(e.target.value)}
                required
              />
            </label>
            <label>
              Descripción:
              <textarea
                value={formDescripcion}
                onChange={(e) => setFormDescripcion(e.target.value)}
                required
              />
            </label>
            <label>
              Precio:
              <input
                type="number"
                value={formPrecio}
                min={0}
                onChange={(e) => setFormPrecio(Number(e.target.value))}
                required
              />
            </label>
            <label>
              Habitaciones:
              <input
                type="number"
                value={formHabitaciones}
                min={1}
                onChange={(e) => setFormHabitaciones(Number(e.target.value))}
                required
              />
            </label>
            <label>
              Baños:
              <input
                type="number"
                value={formBanos}
                min={1}
                onChange={(e) => setFormBanos(Number(e.target.value))}
                required
              />
            </label>
            <label>
              Capacidad:
              <input
                type="number"
                value={formCapacidad}
                min={1}
                onChange={(e) => setFormCapacidad(Number(e.target.value))}
                required
              />
            </label>
            <label>
              Foto:
              <input type="file" accept="image/*" onChange={handleImgChange} />
            </label>
            <div className="admin-cabanas-form-buttons">
              <button type="submit" className="admin-cabanas-toggle">
                Guardar
              </button>
              <button
                type="button"
                className="admin-cabanas-toggle inactivo"
                onClick={() => setEditMode(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3>{formNombre}</h3>
            <p>{formDescripcion}</p>
            <p className="precio">${formPrecio} por noche</p>
            <p className="cabana-detalles">
              Habitaciones: {formHabitaciones} | Baños: {formBanos} | Capacidad: {formCapacidad} personas
            </p>
            <div className="admin-cabanas-card-actions">
              <button
                className="admin-cabanas-edit-btn"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>
              <button
                className={`admin-cabanas-toggle ${
                  !isActivo ? "inactivo" : ""
                }`}
                onClick={toggleActivoLocal}
              >
                {isActivo ? "Desactivar" : "Activar"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CabanaCard;
