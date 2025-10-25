import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useBookContext } from "../context/BookContext";
import Cartcard from "../components/Cartcard";
import { useNavigate } from "react-router";
const CartPage = () => {
  const { cartitems } = useBookContext();
  const totalitem = cartitems?.reduce((accu, curr) => {
    accu += curr.count;
    return accu;
  }, 0);
  const total = cartitems.reduce((accu, curr) => {
    accu += curr.price.originalPrice * curr.count;
    return accu;
  }, 0);
  const discount = cartitems.reduce((accu, curr) => {
    accu +=
      (curr.price.originalPrice - curr.price.discountedPrice) * curr.count;
    //    price: { originalPrice: 760, discountedPrice: 610 },
    return accu;
  }, 0);

  const d_charge = cartitems.reduce((accu, curr) => {
    // accu += curr.deliveryCharges.applicable && curr.deliveryCharges.charge;
    //    deliveryCharges: { applicable: true, charge: 100 },
    if (curr.deliveryCharges.applicable) {
      accu += curr.deliveryCharges.charge;
    }

    return accu;
  }, 0);
  const totalAmt = total + d_charge - discount;
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    navigate("/checkout", {
      state: { totalitem, total, discount, d_charge, totalAmt },
    });
  };
  return (
    <div>
      <Navbar />
      {cartitems.length === 0 && (
        <h2 className="text-center m-5">There are no items in the cart.</h2>
      )}
      {cartitems && cartitems.length > 0 && (
        <main>
          <h1 className="text-center">My Cart({totalitem})</h1>
          <div className="container">
            {/* divide to container */}
            <div className="row">
              {/* //listing items */}
              <div className="col-md-6">
                <section>
                  {cartitems.map((b) => (
                    <Cartcard book={b} key={`cartitem${b.id}`} />
                  ))}
                </section>
              </div>
              {/* total cost */}
              <div className="col-md-6 mt-3">
                <div className="card p-3">
                  <h3 className="mb-4">PRICE DETAILS</h3>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Price ({`${totalitem}`})</span>
                      <span>₹{`${total}`}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Discount</span>
                      <span>-₹{`${discount}`}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Delivery Charges</span>
                      <span>₹{`${d_charge}`}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between fw-bold">
                      <span>TOTAL AMOUNT</span>
                      <span>₹{`${totalAmt}`}</span>
                    </li>
                  </ul>
                  <p className="mb-2 fw-bold">
                    You will save ₹{`${discount}`} on this order
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default CartPage;
