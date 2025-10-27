import React, { useState } from "react";
import Navbar from "./Navbar";
import { useBookContext } from "../context/BookContext";
import Modal from "./Modal";
import Address from "./Address";

const Userprofile = () => {
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

      <main className="container py-4">
        {/* Section 1: Personal Details + Add Address */}
        <section className="row g-3 mb-4">
          {/* Personal Details */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h3 className="mb-3 text-secondary border-bottom pb-2">
                  Personal Details
                </h3>
                <p className="mb-2">
                  <strong>Name:</strong> Sourjyendu Barik
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> sourjyendu@1234.com
                </p>
                <p className="mb-2">
                  <strong>Phone:</strong> 9876543210
                </p>
                <p className="mb-0">
                  <strong>Default Address:</strong> 123 Street, Bhubaneswar,
                  Odisha, 754001
                </p>
              </div>
            </div>
          </div>

          {/* Add Address */}
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

        {/* Section 2: Address List */}
        <section className="mb-4">
          <Address />
        </section>

        {/* Section 3: Previous Orders */}
        {orders.length > 0 && (
          <section>
            <h3 className="text-center text-secondary mb-3 border-bottom pb-2">
              Previous Orders
            </h3>
            <div className="row g-3">
              {orders.map((o, index) => (
                <div className="col-md-4" key={`order${index}`}>
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      <p className="fw-bold">Total Items: {o.totalitem}</p>
                      <p>Total: ₹{o.total}</p>
                      <p>Discount: ₹{o.discount}</p>
                      <p>Delivery: ₹{o.d_charge}</p>
                      <p className="fw-semibold">Payable: ₹{o.totalAmt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {show && (
          <Modal show={show} message="New address added successfully." />
        )}
      </main>
    </div>
  );
};

export default Userprofile;
