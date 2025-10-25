import React from "react";

const Checkbox = ({ label, checked, name, handleFilter }) => {
  const onchange = (e) => {
    handleFilter(label, e.target.checked);
  };
  return (
    <div className="form-check">
      <input
        type="checkbox"
        name={name}
        id={label}
        className="form-check-input"
        onChange={onchange}
        checked={checked}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;
