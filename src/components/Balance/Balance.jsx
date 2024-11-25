import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Balance.css';
import { getToken } from '../../utils/auth-utils';

export const Balance = () => {
  const username = useSelector((state) => state.usuarios.username);

  const [total_ingresos, setTotalIngresos] = useState(0);
  const [total_egresos, setTotalEgresos] = useState(0);
  const [balance_general, setBalanceGnral] = useState(0); // Cambiado de null a 0 para evitar errores.
  const [loading, setLoading] = useState(true);

  const getBalance = async () => {
    try {
      const url = `balance`;
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Validamos y asignamos valores seguros
        setTotalIngresos(Number(data.total_ingresos) || 0);
        setTotalEgresos(Number(data.total_egresos) || 0);
        setBalanceGnral(Number(data.balance_general) || 0);
      } else {
        console.error("Error al obtener el balance:", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onopen = () => {
      console.log("Conexión WebSocket establecida.");
      socket.send("Solicitar balance");
    };

    socket.onmessage = (event) => {
      console.log("Mensaje recibido: ", event.data);
      const balance = JSON.parse(event.data);
      // Validamos y asignamos valores seguros
      setTotalIngresos(Number(balance.total_ingresos) || 0);
      setTotalEgresos(Number(balance.total_egresos) || 0);
      setBalanceGnral(Number(balance.balance_general) || 0);
      setLoading(false);
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket: ", error);
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada.");
    };

    return () => {
      socket.close();
    };
  }, []);

  const total = total_ingresos + total_egresos;
  const incomePercentage = total > 0 ? (total_ingresos / total) * 100 : 0;
  const expensesPercentage = total > 0 ? (total_egresos / total) * 100 : 0;

  if (loading) {
    return (
      <div className="noticias-loading-overlay">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="balance-container">
      <div className="balance-header">
        <h2>Balance del Club</h2>
      </div>
      <div className="balance-content">
        <div className="balance-left-panel">
          <div className="balance-income-section">
            <p>Ingresos</p>
            <p className="balance-income-amount">
              + ${total_ingresos.toFixed(2)}
            </p>
          </div>
          <div className="balance-expenses-section">
            <p>Gastos</p>
            <p className="balance-expenses-amount">
              - ${total_egresos.toFixed(2)}
            </p>
          </div>
          <div className="balance-general-section">
            <p>Balance General</p>
            <p className="balance-general-amount">
              ${balance_general.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="balance-right-panel">
          <div
            className="balance-chart"
            style={{
              background: `conic-gradient(#2ecc71 ${incomePercentage}%, #e74c3c 0 ${expensesPercentage}%)`,
            }}
          >
            <div className="balance-chart-circle">
              <span className="balance-chart-center-text">
                ${balance_general.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="balance-footer">
        <p>Total Ingresos: ${total_ingresos.toFixed(2)}</p>
        <p>Total Egresos: ${total_egresos.toFixed(2)}</p>
        <p>Balance General: ${balance_general.toFixed(2)}</p>
      </div>
    </div>
  );
};
