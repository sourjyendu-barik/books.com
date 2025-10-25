import React, { useState } from "react";
import { useBookContext } from "../context/BookContext";
const AddressModal = ({ currentAddress_id, onClose }) => {
  const { address, setAddress } = useBookContext();
  const current_address = address.find(
    (a) => a.address_id === currentAddress_id
  );
  const [formData, setFormData] = useState(current_address || {});

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setAddress((prev) =>
      prev.map((a) =>
        a.address_id === currentAddress_id
          ? { ...formData, address_id: currentAddress_id }
          : a
      )
    );
    onClose();
  };
  const handleClose = () => onClose();
  return (
    <div
      className="modal show fade"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit address</h5>
            <button className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column gap-2">
              <input
                type="text"
                onChange={handleOnChange}
                name="house"
                required
                value={formData.house}
                className="form-control"
              />
              <input
                type="text"
                onChange={handleOnChange}
                name="dist"
                required
                value={formData.dist}
                className="form-control"
              />
              <input
                type="text"
                onChange={handleOnChange}
                name="state"
                required
                value={formData.state}
                className="form-control"
              />
              <input
                type="text"
                onChange={handleOnChange}
                name="pin"
                required
                value={formData.pin}
                className="form-control"
              />
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
