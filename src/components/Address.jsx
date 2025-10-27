import React, { useState } from "react";
import { useBookContext } from "../context/BookContext";
import AddressModal from "./AddressModal";

const Address = () => {
  const { address, setAddress, currentAddress, setCurrentAdress } =
    useBookContext();
  const [editadressId, setEditAdressId] = useState(null);

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

  return (
    <section className="my-4">
      <h2 className="text-center fw-semibold mb-4">Choose an Address</h2>
      <div className="row g-3">
        {address.map((a, index) => {
          const isSelected =
            currentAddress?.pin === a.pin && currentAddress?.house === a.house;

          return (
            <div className="col-md-4" key={`address${index}`}>
              <div
                className={`card shadow-sm h-100 border-0 position-relative ${
                  isSelected ? "border border-3 border-success shadow-lg" : ""
                }`}
                onClick={() => handleSelectAddress(a)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div className="position-absolute top-0 end-0 m-2 d-flex">
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      padding: "6px",
                    }}
                    title="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      editAddress(a.address_id);
                    }}
                  >
                    ✏️
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      padding: "6px",
                    }}
                    title="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAddress(a.address_id);
                    }}
                  >
                    🗑️
                  </span>
                </div>
                <div className="card-body text-start p-4">
                  <h5 className="fw-semibold text-primary mb-3">
                    Address {index + 1}
                  </h5>
                  <p className="mb-1">
                    <strong>House:</strong> {a.house}
                  </p>
                  <p className="mb-1">
                    <strong>District:</strong> {a.dist}
                  </p>
                  <p className="mb-1">
                    <strong>State:</strong> {a.state}
                  </p>
                  <p className="mb-0">
                    <strong>Pin:</strong> {a.pin}
                  </p>
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
  );
};

export default Address;
