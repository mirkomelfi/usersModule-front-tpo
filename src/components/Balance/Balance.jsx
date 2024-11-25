import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Balance.css';
import { getToken } from '../../utils/auth-utils';

export const Balance = () => {
  const username = useSelector((state) => state.usuarios.username);

  const [total_ingresos, setTotalIngresos] = useState(0);
  const [total_egresos, setTotalEgresos] = useState(0);
  const [balance_gnral, setBalanceGnral] = useState(null);
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
        setTotalIngresos(data.total_ingresos || 0);
        setTotalEgresos(data.total_egresos || 0);
        setBalanceGnral(data.balance_gnral || 0);
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
      setTotalIngresos(balance.total_ingresos || 0);
      setTotalEgresos(balance.total_egresos || 0);
      setBalanceGnral(balance.balance_gnral || 0);
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
            <p className="balance-income-amount">+ ${(total_ingresos / 1000000).toFixed(2)}M</p>
          </div>
          <div className="balance-expenses-section">
            <p>Gastos</p>
            <p className="balance-expenses-amount">- ${(total_egresos / 1000000).toFixed(2)}M</p>
          </div>
          <div className="balance-general-section">
            <p>Balance General</p>
            <p className="balance-general-amount">${(balance_gnral / 1000000).toFixed(2)}M</p>
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
              <span className="balance-chart-center-text">${(balance_gnral / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </div>
      </div>
      <div className="balance-footer">
        <p>Total Ingresos: ${(total_ingresos / 1000000).toFixed(2)}M</p>
        <p>Total Egresos: ${(total_egresos / 1000000).toFixed(2)}M</p>
        <p>Balance General: ${(balance_gnral / 1000000).toFixed(2)}M</p>
      </div>
    </div>
  );
};
