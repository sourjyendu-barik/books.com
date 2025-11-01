import React, { useState } from "react";
import { useBookContext } from "../context/BookContext";
import AddressModal from "./AddressModal";

const Address = () => {
  const { address, setAddress, currentAddress, setCurrentAdress } =
    useBookContext();

  const [editadressId, setEditAdressId] = useState(null);

  const handleSelectAddress = (selectedAddress) => {
    setCurrentAdress(selectedAddress);
  };

  const deleteAddress = (addressId) => {
    setAddress((prev) => prev.filter((a) => a.address_id !== addressId));
  };

  const editAddress = (addressId) => {
    setEditAdressId(addressId);
  };

  return (
    <section className="my-2">
      <div className="row g-3">
        {address.map((a, index) => {
          // ✅ Loose equality (handles number/string mismatch)
          const isSelected = currentAddress?.address_id == a.address_id;

          return (
            <div className="col-md-4" key={a.address_id}>
              <div
                onClick={() => handleSelectAddress(a)}
                className="position-relative p-4 bg-white rounded-3 shadow-sm"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: isSelected
                    ? "3px solid black"
                    : "3px solid transparent",
                  minHeight: "180px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {/* Edit/Delete icons */}
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

                {/* Address details */}
                <div className="text-start">
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

      {/* Edit modal */}
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
