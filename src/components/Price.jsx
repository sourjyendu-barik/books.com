import React from "react";

const Price = ({ bookprice }) => {
  const presentprice = bookprice.discountedPrice;
  const orginal_Price = bookprice.originalPrice;
  const discount = (
    ((orginal_Price - presentprice) / orginal_Price) *
    100
  ).toFixed(2);
  return (
    <div>
      <div className="d-flex align-items-center gap-2">
        <span className="fw-bold  fs-3">₹{presentprice}</span>
        <span className="text-muted text-decoration-line-through fs-5">
          ₹{orginal_Price}
        </span>
      </div>
      <span className="text-muted fs-5">{discount}% off</span>
    </div>
  );
};

export default Price;
