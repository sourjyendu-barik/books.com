import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useBookContext } from "../context/BookContext";
import Modal from "../components/Modal";
import Address from "../components/Address";
const Checkout = () => {
  const location = useLocation();
  const { setOrders, setcartitems, cartitems, currentAddress } =
    useBookContext();
  const [showModel, setShowModel] = useState(false);
  const { totalitem, total, discount, d_charge, totalAmt } =
    location.state || {};

  const handleOrder = (e) => {
    e.preventDefault();

    if (!currentAddress) {
      return;
    }

    setOrders((prev) => [
      ...prev,
      { totalitem, total, discount, d_charge, totalAmt, currentAddress },
    ]);

    setcartitems([]);

    setShowModel(true);
    setTimeout(() => {
      setShowModel(false);
    }, 2000);
  };

  return (
    <div>
      <Navbar />

      <main className="container pb-5">
        <section className="row g-4 p-3">
          {/* Left Side — Summary */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="h4 mb-3 text-center text-primary fw-semibold">
                  Checkout Summary
                </h2>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <span className="fw-semibold">Total Items:</span>{" "}
                    {totalitem}
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold">Total:</span> ₹{total}
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold">Discount:</span> ₹{discount}
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold">Delivery Charges:</span> ₹
                    {d_charge}
                  </li>
                </ul>
                <hr />
                <h4 className="text-success text-center fw-bold mt-3">
                  Total Payable: ₹{totalAmt}
                </h4>
              </div>
            </div>
          </div>

          {/* Right Side — Product Table */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="h5 mb-3 text-center text-secondary">
                  Your Items
                </h5>
                <table className="table table-striped align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Product Name</th>
                      <th className="text-center">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartitems.map((item, index) => (
                      <tr key={`${item.name}${index}`}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Address Section */}
        <Address />

        {/* Checkout Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleOrder}
            className="btn btn-success px-5 py-2 fw-semibold shadow-sm"
            style={{ borderRadius: "12px", fontSize: "1.1rem" }}
          >
            Place Order
          </button>
        </div>
      </main>

      <Modal show={showModel} message="Order placed successfully." />
    </div>
  );
};

export default Checkout;
