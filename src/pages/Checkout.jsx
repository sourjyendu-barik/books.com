import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useBookContext } from "../context/BookContext";
import Modal from "../components/Modal";
import Address from "../components/Address";
const Checkout = () => {
  const location = useLocation();
  const { setOrders, setcartitems, currentAddress } = useBookContext();
  const [showModel, setShowModel] = useState(false);
  const {
    from,
    bookWithCount: book,
    totalitem,
    total,
    discount,
    d_charge,
    totalAmt,
    cartitems = [],
  } = location.state || {};

  //if checkout comes from card directly
  const singleBookSummary = book
    ? {
        totalitem: 1,
        total: book.price.originalPrice,
        discount: book.price.originalPrice - book.price.discountedPrice,
        d_charge: book.deliveryCharges.applicable
          ? book.deliveryCharges.charge
          : 0,
        totalAmt:
          book.price.discountedPrice +
          (book.deliveryCharges.applicable ? book.deliveryCharges.charge : 0),
      }
    : {};

  //which summaray to use
  const summaray =
    from === "details"
      ? singleBookSummary
      : { totalitem, total, discount, d_charge, totalAmt };

  ///items to show in table we use a [book] in xase of multiple items it should go throug map method

  const itemsToDisplayed = from === "details" ? [book] : cartitems;
  //handler for order
  const handleOrder = (e) => {
    e.preventDefault();

    if (!currentAddress) {
      return;
    }
    const orderDate = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setOrders((prev) => [
      ...prev,
      { ...summaray, currentAddress, items: itemsToDisplayed, orderDate },
    ]);
    if (from !== "details") setcartitems([]);

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
                    {summaray.totalitem}
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold">Total:</span> ₹
                    {summaray.total}
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold">Discount:</span> ₹
                    {summaray.discount}
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold">Delivery Charges:</span> ₹
                    {summaray.d_charge}
                  </li>
                </ul>
                <hr />
                <h4 className="text-success text-center fw-bold mt-3">
                  Total Payable: ₹{summaray.totalAmt}
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

                <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                  <table className="table table-striped align-middle mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>Product Name</th>
                        <th className="text-center">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsToDisplayed.length > 0 ? (
                        itemsToDisplayed.map((item, index) => (
                          <tr key={`${item.name}${index}`}>
                            <td>{item.name}</td>
                            <td className="text-center">{item.count}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center text-muted">
                            No items to display
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
