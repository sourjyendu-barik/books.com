import React from "react";
import { Heart } from "lucide-react";
import { useBookContext } from "../context/BookContext";
const Wishcount = () => {
  const { wishlist } = useBookContext();
  return (
    <div className="position-relative d-inline-block">
      <Heart />
      {wishlist.length > 0 && (
        <span
          className="badge bg-danger rounded-pill position-absolute"
          style={{ top: "-0.5rem", right: "-0.5rem" }}
        >
          {wishlist.length}
        </span>
      )}
    </div>
  );
};

export default Wishcount;
