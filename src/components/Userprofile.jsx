import React, { useState } from "react";
import Navbar from "./Navbar";
import { useBookContext } from "../context/BookContext";
import Modal from "./Modal";
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
    setTimeout(() => {
      setShow(false);
    }, 1500);
    setFormData({
      house: "",
      dist: "",
      state: "",
      pin: "",
    });
  };
  return (
    <div>
      <Navbar />
      <section className="p-4">
        <div className="container">
          <h2 className="text-center">User profile</h2>
          <div className="row p-2">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <div>
                    <h3>Sourjyendu Barik</h3>
                    <p>
                      <strong>Email: </strong> sourjyendu@1234.com
                    </p>
                    <p>
                      <strong>Phone Number: </strong> 9876543210
                    </p>
                    <p>
                      <strong>Address: </strong> 123street,Bhubneswar,Odisha
                      Pin-754001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-2">
              <div className="card">
                <div className="card-body">
                  <h3>Add New Address</h3>
                  <form onSubmit={handleAddAddress}>
                    <div className="mb-1">
                      <input
                        type="text"
                        id="house"
                        className="form-control"
                        placeholder="House Name"
                        name="house"
                        value={formData.house}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        id="dist"
                        className="form-control"
                        placeholder="District name"
                        name="dist"
                        value={formData.dist}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        id="state"
                        className="form-control"
                        placeholder="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        id="pin"
                        className="form-control"
                        placeholder="Pincode"
                        name="pin"
                        value={formData.pin}
                        onChange={handleInput}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-secondary">
                      Add New Address
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {orders.length > 0 && (
            <h2 className="text-center">Previous Orders</h2>
          )}
          <div className="row">
            {orders?.length > 0 &&
              orders.map((o, index) => {
                return (
                  <div className="col-md-3 mt-3" key={`order${index}`}>
                    <div className="card h-100">
                      <div className="card-body">
                        <p className="fw-bold">Total Items: {o.totalitem}</p>
                        <p>Total: ₹{o.total}</p>
                        <p>Discount: ₹{o.discount}</p>
                        <p>Delivery Charges: ₹{o.d_charge}</p>
                        <p>Total Payable: ₹{o.totalAmt}</p>
                        <p className="fw-medium"></p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {show && <Modal show={show} message="New address added sucessfully." />}
      </section>
    </div>
  );
};

export default Userprofile;
