import React from "react";
import { ShoppingCart } from "lucide-react";
import { useBookContext } from "../context/BookContext";
function Cart() {
  const { cartitems } = useBookContext();
  const totalitem = cartitems?.reduce((accu, curr) => {
    accu += curr.count;
    return accu;
  }, 0);
  return (
    <div className="position-relative d-inline-block">
      <ShoppingCart />
      {cartitems.length > 0 && (
        <span
          className="badge bg-danger rounded-pill position-absolute"
          style={{ top: "-0.5rem", right: "-0.5rem" }}
        >
          {totalitem}
        </span>
      )}
    </div>
  );
}

export default Cart;
