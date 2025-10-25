import React from "react";

const Modal = ({ show, message }) => {
  if (!show) return null;
  return (
    <div
      className="position-fixed top-50 start-50 translate-middle"
      style={{
        zIndex: 1050,
        minWidth: "300px",
        maxWidth: "400px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div className="card">
        <div className="card-body">
          <p className="mb-0">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default Modal;
