import React, { useState } from "react";
import "./style.css";

const ConfirmBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-box">
      <div className="confirmation-content">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button className="green-banner" onClick={onCancel}>
            Cerrar
          </button>
          <button className="green-banner" onClick={onConfirm}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmBox;
