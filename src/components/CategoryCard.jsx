import React from "react";

const CategoryCard = ({ image, onClick, name }) => {
  return (
    <div className="col-md-3 position-relative text-center">
      <img
        src={image}
        alt={name}
        className="img-fluid mb-2"
        onClick={() => onClick(name)}
        style={{ cursor: "pointer" }}
      />
      <div className="position-absolute top-50 start-50 fw-bold text-dark p-2 fs-3  bg-dark translate-middle bg-white rounded">
        {name}
      </div>
    </div>
  );
};

export default CategoryCard;
