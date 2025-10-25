import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useBookContext } from "../context/BookContext";
import Modal from "../components/Modal";
import AddressModal from "../components/AddressModal";
const Checkout = () => {
  const location = useLocation();
  const { address, setOrders, setcartitems, setAddress, cartitems } =
    useBookContext();
  const [currentAddress, setCurrentAdress] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [editadressId, setEditAdressId] = useState(null);
  const { totalitem, total, discount, d_charge, totalAmt } =
    location.state || {};

  const handleSelectAddress = (address) => {
    setCurrentAdress(address);
  };
  const deleteAddress = (addressId) => {
    const selectedAddress = address.find((a) => a.address_id === addressId);
    setAddress((prev) =>
      prev.filter((a) => a.address_id !== selectedAddress.address_id)
    );
  };
  const editAddress = (addressId) => {
    setEditAdressId(addressId);
  };
  const handleOrder = (e) => {
    e.preventDefault();

    if (!currentAddress) {
      alert("Please select an address before placing the order.");
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
      <main className="container pb-3">
        <section className="p-3 row">
          <div className="col-md-6">
            <div className="card p-2">
              <h2>Checkout</h2>
              <p className="fw-bold">Total Items: {totalitem}</p>
              <p>Total: ₹{total}</p>
              <p>Discount: ₹{discount}</p>
              <p>Delivery Charges: ₹{d_charge}</p>
              <h4>Total Payable: ₹{totalAmt}</h4>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-2">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cartitems.map((item, index) => (
                    <tr key={`${item.name}${index}`}>
                      <td>{item.name}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal show={showModel} message="Order placed successfully." />
        </section>
        <section>
          <h2>Choose one address </h2>
          <div className="row">
            {address.map((a, index) => {
              const isSelected =
                currentAddress?.pin === a.pin &&
                currentAddress?.house === a.house;

              return (
                <div className="col-md-4 mt-2" key={`address${index}`}>
                  <div
                    className={`card h-100 position-relative ${
                      isSelected ? "border border-3 border-success" : ""
                    }`}
                    onClick={() => handleSelectAddress(a)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div className="position-absolute top-0 end-0 m-2 d-flex">
                      <span
                        style={{ cursor: "pointer" }}
                        className="p-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          editAddress(a.address_id);
                        }}
                      >
                        ✏️
                      </span>
                      <span
                        style={{ cursor: "pointer" }}
                        className="p-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAddress(a.address_id);
                        }}
                      >
                        🗑️
                      </span>
                    </div>
                    <div className="card-body">
                      <h5>Address: {index + 1}</h5>
                      <p className="fw-medium">House: {a.house}</p>
                      <p className="fw-medium">District: {a.dist}</p>
                      <p className="fw-medium">State:{a.state}</p>
                      <p className="fw-medium">Pin:{a.pin}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {editadressId && (
            <AddressModal
              currentAddress_id={editadressId}
              onClose={() => setEditAdressId(null)}
            />
          )}
        </section>
        <button
          onClick={handleOrder}
          className="btn btn-success d-block w-50 mx-auto mt-3"
        >
          Checkout
        </button>
      </main>
    </div>
  );
};

export default Checkout;
