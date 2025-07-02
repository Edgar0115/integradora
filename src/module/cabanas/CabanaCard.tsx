import React, { useState, ChangeEvent, FormEvent } from "react";

type CabanaCardProps = {
  imgSrc: string;
  nombre: string;
  descripcion: string;
  precio: number;
  onUpdate?: (data: { nombre: string; descripcion: string; precio: number; imgSrc: string }) => void;
};

const CabanaCard = ({ imgSrc, nombre, descripcion, precio, onUpdate }: CabanaCardProps) => {
  const [activo, setActivo] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Estados para editar
  const [formNombre, setFormNombre] = useState(nombre);
  const [formDescripcion, setFormDescripcion] = useState(descripcion);
  const [formPrecio, setFormPrecio] = useState(precio);
  const [formImgSrc, setFormImgSrc] = useState(imgSrc);

  // Para cargar imagen localmente y mostrar preview
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
    // Pasar datos al padre si hay callback
    if (onUpdate) {
      onUpdate({ nombre: formNombre, descripcion: formDescripcion, precio: formPrecio, imgSrc: formImgSrc });
    }
  };

  return (
    <div className={`cabana ${activo ? "" : "desactivada"}`}>
      <img src={formImgSrc} alt={formNombre} />
      <div className="contenido">
        {editMode ? (
          <form onSubmit={handleSubmit} className="form-editar">
            <label>
              Nombre:
              <input
                type="text"
                value={formNombre}
                onChange={e => setFormNombre(e.target.value)}
                required
              />
            </label>
            <label>
              Descripción:
              <textarea
                value={formDescripcion}
                onChange={e => setFormDescripcion(e.target.value)}
                required
              />
            </label>
            <label>
              Precio:
              <input
                type="number"
                value={formPrecio}
                min={0}
                onChange={e => setFormPrecio(Number(e.target.value))}
                required
              />
            </label>
            <label>
              Foto:
              <input type="file" accept="image/*" onChange={handleImgChange} />
            </label>
            <div className="botones-form">
              <button type="submit" className="btn guardar">Guardar</button>
              <button type="button" className="btn cancelar" onClick={() => setEditMode(false)}>Cancelar</button>
            </div>
          </form>
        ) : (
          <>
            <h3>{formNombre}</h3>
            <p>{formDescripcion}</p>
            <p><strong>${formPrecio} por noche</strong></p>
            <div className="admin-controls">
              <button className="btn editar" onClick={() => setEditMode(true)}>Editar</button>
              <button
                className={`btn ${activo ? "desactivar" : "activar"}`}
                onClick={() => setActivo(!activo)}
              >
                {activo ? "Desactivar" : "Activar"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CabanaCard;
