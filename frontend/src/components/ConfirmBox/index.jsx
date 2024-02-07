import React, { useState } from "react";
import "./style.css";

const ConfirmBox = ({ id, message, className, onConfirm, onCancel }) => {
  return (
    <div id={id} className={`confirmation-box ${className}`}>
      <div className="confirmation-content"> {message}</div>
    </div>
  );
};
export default ConfirmBox;
