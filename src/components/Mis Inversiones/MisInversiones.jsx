import React, { useState, useEffect } from 'react';
import './MisInversiones.css';

// Datos de ejemplo para las inversiones realizadas
const inversionesData = [
  { id: 1, nombre: 'Inversión A', descripcion: 'Agrandar el Estadio', montoInvertido: 1000, rentabilidad: '8% anual', retornoActual: 1080, estado: 'positivo' },
  { id: 2, nombre: 'Inversión B', descripcion: 'Agrandar el Estadio', montoInvertido: 500, rentabilidad: '-5% anual', retornoActual: 475, estado: 'negativo' },
  { id: 3, nombre: 'Inversión C', descripcion: 'Agrandar el Estadio', montoInvertido: 2000, rentabilidad: '12% anual', retornoActual: 2240, estado: 'positivo' },
  { id: 4, nombre: 'Inversión D', descripcion: 'Proyecto de Renovación', montoInvertido: 1500, rentabilidad: '5% anual', retornoActual: 1575, estado: 'positivo' },
  { id: 5, nombre: 'Inversión E', descripcion: 'Nueva Infraestructura', montoInvertido: 1200, rentabilidad: '-2% anual', retornoActual: 1176, estado: 'negativo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
];

export const MisInversiones = () => {
  const [inversiones, setInversiones] = useState([]);

  useEffect(() => {
    // Simulamos una llamada a una API para obtener las inversiones
    setInversiones(inversionesData);
  }, []);

  return (
    <div className="misInversiones-container">
      <h2 className="misInversiones-header">Mis Inversiones</h2>

      <div className="misInversiones-table-container">
        <table className="misInversiones-table">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Descripción</th>
              <th>Monto Invertido ($)</th>
              <th>Rentabilidad</th>
              <th>Retorno Actual ($)</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {inversiones.map((inversion) => (
              <tr key={inversion.id} className={`misInversiones-row ${inversion.estado === 'positivo' ? 'misInversiones-positivo' : 'misInversiones-negativo'}`}>
                <td>{inversion.nombre}</td>
                <td>{inversion.descripcion}</td>
                <td>{inversion.montoInvertido}</td>
                <td>{inversion.rentabilidad}</td>
                <td>{inversion.retornoActual}</td>
                <td className={`misInversiones-estado ${inversion.estado}`}>{inversion.estado === 'positivo' ? 'Positivo' : 'Negativo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
