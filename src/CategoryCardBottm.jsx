import React from "react";

const CategoryCardBottm = ({ Image, text, name, onClick }) => {
  return (
    <div className="col-12 col-md-6">
      <div className="card p-3 h-100 d-flex flex-column">
        <div className="row h-100">
          <div className="col-md-4">
            <img
              src={Image}
              alt={name}
              className="img-fluid"
              style={{ objectFit: "cover", cursor: "pointer" }}
              onClick={() => onClick(name)}
            />
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center">
            <p>New Arrivals</p>
            <h5>{name} Books</h5>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCardBottm;
