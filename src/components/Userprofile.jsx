import React, { useState } from "react";
import Navbar from "./Navbar";
import { useBookContext } from "../context/BookContext";
import Modal from "./Modal";
import Address from "./Address";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
const Userprofile = () => {
  const { user, loading, error, login, logout } = useAuth();
  const { orders, setAddress, address } = useBookContext();
  const [formData, setFormData] = useState({
    house: "",
    dist: "",
    state: "",
    pin: "",
  });
  const [show, setShow] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddress((prev) => [
      ...prev,
      { ...formData, address_id: address.length + 1 },
    ]);
    setShow(true);
    setTimeout(() => setShow(false), 1500);
    setFormData({ house: "", dist: "", state: "", pin: "" });
  };

  return (
    <div>
      <Navbar />
      <main className="container pt-4" style={{ paddingBottom: "5rem" }}>
        {/* PERSONAL DETAILS + ADD ADDRESS */}
        <section className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h3 className="mb-3 text-secondary border-bottom pb-2">
                  Personal Details
                </h3>

                <div className="row align-items-center">
                  {/* Left Side - User Details */}
                  <div className="col-8">
                    <p>
                      <strong>Name:</strong> {user?.name}
                    </p>

                    <p>
                      <strong>Email:</strong> {user?.email}
                    </p>

                    <p>
                      <strong>Joined:</strong>{" "}
                      {new Date(user?.joined).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Right Side - Profile Image */}
                  <div className="col-4 text-end">
                    <img
                      src={user?.profilePicture}
                      alt={user?.name}
                      className="rounded-circle border shadow-sm"
                      width="100"
                      height="100"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button className="btn btn-outline-danger" onClick={logout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h3 className="mb-3 text-secondary border-bottom pb-2">
                  Add New Address
                </h3>
                <form onSubmit={handleAddAddress}>
                  <div className="row g-2">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="House Name"
                        name="house"
                        value={formData.house}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="District"
                        name="dist"
                        value={formData.dist}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pincode"
                        name="pin"
                        value={formData.pin}
                        onChange={handleInput}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100 mt-3 fw-semibold"
                  >
                    Add Address
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ADDRESS LIST */}
        <section className="mb-4">
          <h3 className="text-center">Address list</h3>
          <Address />
        </section>

        {/* PREVIOUS ORDERS */}
        {orders.length > 0 && (
          <section>
            <h3 className="text-center text-secondary mb-4 border-bottom pb-2">
              Previous Orders
            </h3>

            {orders.map((o, index) => (
              <div
                className="card shadow-sm border-0 mb-3 p-3"
                key={`order${index}`}
              >
                <div className="row g-3">
                  {/* LEFT SIDE */}
                  <div className="col-md-5 col-12">
                    <div className="border rounded p-3 h-100 bg-light">
                      <h6 className="text-primary fw-semibold mb-2">
                        🧾 Order ID: {o.orderId || `#ORD${index + 1}`}
                      </h6>
                      <p className="mb-1">
                        <strong>Date:</strong> {o.orderDate}
                      </p>
                      <p className="mb-1">
                        <strong>Total Items:</strong> {o.totalitem}
                      </p>
                      <p className="mb-1">Total: ₹{o.total}</p>
                      <p className="mb-1">Discount: ₹{o.discount}</p>
                      <p className="mb-1">Delivery: ₹{o.d_charge}</p>
                      <p className="fw-semibold text-success mt-2">
                        Payable: ₹{o.totalAmt}
                      </p>
                      <p>
                        <strong>Address:</strong>
                        {`   ${o.currentAddress.house},${o.currentAddress.dist},${o.currentAddress.state},${o.currentAddress.pin}`}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="col-md-7 col-12">
                    <div
                      className="border rounded p-2 bg-white"
                      style={{ maxHeight: "250px", overflowY: "auto" }}
                    >
                      <table className="table table-striped align-middle mb-0">
                        <thead className="table-light sticky-top">
                          <tr>
                            <th>Product Name</th>
                            <th className="text-center">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {o.items?.length > 0 ? (
                            o.items.map((item, idx) => (
                              <tr key={`${item.name}${idx}`}>
                                <td>{item.name}</td>
                                <td className="text-center">{item.count}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="2"
                                className="text-center text-muted"
                              >
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
            ))}
          </section>
        )}

        {show && (
          <Modal show={show} message="New address added successfully." />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Userprofile;
