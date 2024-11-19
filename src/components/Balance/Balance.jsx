import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Balance.css';
import { getToken } from '../../utils/auth-utils';

const balanceData = {
  gain: '€2.70M',
  income: 10000000, // Ingresos en número
  expenses: 8470000, // Gastos en número
  clubValue: '€25.61M',
  projection: '€27.67M',
};

export const Balance = () => {
  const username = useSelector((state) => state.usuarios.username);

  const income = balanceData.income;
  const expenses = balanceData.expenses;
  const total = income + expenses;
  const [balance,setBalance]=useState(null)
  const [loading,setLoading]=useState(null)
  // Calculamos el porcentaje de ingresos y gastos
  const incomePercentage = (income / total) * 100;
  const expensesPercentage = (expenses / total) * 100;


  /*const getBalance = async() =>{
    
    let url=`balance`
  
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       // "Authorization": `Bearer ${getToken()}`,
      }
      
    })

    const data= await response.json()
    console.log(data.msj)

  }*/

  /*useEffect(() => { 
      getBalance()
  },[])*/


  /*useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onopen = () => {
        console.log("Conexión WebSocket establecida.");
        // Enviar el ID de usuario para identificarlo en el backend
        //socket.send(`USER:${username}`);  // Por ejemplo, 123 es el userId del usuario
    };

    socket.onmessage = (event) => {
        console.log("Mensaje recibido: ", event.data);
        var balance=JSON.parse(event.data)
        setBalance(balance);
        setLoading(false);  // Cuando lleguen las ventas, cambiamos el estado de carga
    };

    socket.onerror = (error) => {
        console.error("Error en WebSocket: ", error);
    };

    socket.onclose = () => {
        console.log("Conexión WebSocket cerrada.");
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
        socket.close();
    };
}, []);*/


  return (
    <div className="balance-container">
      <div className="balance-header">
        <h2>Balance</h2>
      </div>
      <div className="balance-content">
        <div className="balance-left-panel">
          <div className="balance-gain-section">
            <p className="balance-gain-amount">{balanceData.gain}</p>
          </div>
          <div className="balance-income-section">
            <p>Ingresos</p>
            <p className="balance-income-amount">+ €{(income / 1000000).toFixed(2)}M</p>
          </div>
          <div className="balance-expenses-section">
            <p>Gastos</p>
            <p className="balance-expenses-amount">- €{(expenses / 1000000).toFixed(2)}M</p>
          </div>
        </div>
        <div className="balance-right-panel">
          <div
            className="balance-chart"
            style={{
              background: `conic-gradient(#2ecc71 ${incomePercentage}%, #e74c3c 0 ${expensesPercentage}%)`
            }}
          >
            <div className="balance-chart-circle">
              <span className="balance-chart-center-text">{balanceData.gain}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="balance-footer">
        <p>Valor del Club: {balanceData.clubValue}</p>
        <p>Proyección: {balanceData.projection}</p>
      </div>
    </div>
  );
};
