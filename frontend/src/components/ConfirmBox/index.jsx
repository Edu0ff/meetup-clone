import React, { useState } from "react";
import "./style.css";

const ConfirmBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-box">
      <div className="confirmation-content">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm}>Aceptar</button>
          <button onClick={onCancel}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmBox;
