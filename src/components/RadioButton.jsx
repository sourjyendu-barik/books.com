import React from "react";

const RadioButton = ({ label, name, handleFilter, checked, value }) => {
  return (
    <div className="form-check">
      <input
        type="radio"
        name={name}
        id={label}
        className="form-check-input"
        onChange={handleFilter}
        checked={checked}
        value={value}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default RadioButton;
