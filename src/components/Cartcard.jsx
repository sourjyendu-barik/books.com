import React, { useState } from "react";
import Price from "./Price";
import { useBookContext } from "../context/BookContext";
import Modal from "./Modal";

const Cartcard = ({ book }) => {
  const { addItemCount, decreaseItemCount, removeFromCart, moveToWishlist } =
    useBookContext();

  const [removeAlert, setRemoveAlert] = useState(false);
  const [moveToWishlistAlert, setMovetoWishlistAlert] = useState(false);
  const [increaseAlert, setIncreaseAlert] = useState(false);
  const [decreaseAlert, setDecreaseAlert] = useState(false);

  const handleAddItemCount = (book_id) => {
    addItemCount(book.id);
    setIncreaseAlert(true);
    setTimeout(() => setIncreaseAlert(false), 1000);
  };

  const handleDecreaseCount = (book_id) => {
    decreaseItemCount(book_id);
    setDecreaseAlert(true);
    setTimeout(() => setDecreaseAlert(false), 1000);
  };

  const handleRemovefromCart = (bookId) => {
    setRemoveAlert(true);
    setTimeout(() => setRemoveAlert(false), 2000);
    removeFromCart(bookId);
  };

  const handleMoveTowishlist = (book) => {
    setMovetoWishlistAlert(true);
    setTimeout(() => setMovetoWishlistAlert(false), 2000);
    moveToWishlist(book);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 my-3 overflow-hidden">
      <div className="row g-0 align-items-stretch">
        {/* Image Section */}
        <div className="col-md-5 p-0">
          <div
            className="w-100 h-100"
            style={{
              height: "230px", // Fixed uniform height
              overflow: "hidden",
            }}
          >
            <img
              src={book.image}
              alt={book.name}
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                display: "block",
                margin: 0,
                padding: 0,
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="col-md-7 d-flex flex-column justify-content-between p-4">
          <div>
            <p className="fw-semibold fs-5 mb-1 text-dark">{book.name}</p>
            <Price bookprice={book.price} />

            <div className="mt-3 d-flex align-items-center gap-2">
              <span className="fw-medium text-secondary">Quantity:</span>
              <div className="btn-group" role="group">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleDecreaseCount(book.id)}
                >
                  -
                </button>
                <span className="px-3 fw-semibold text-dark">{book.count}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleAddItemCount(book.id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex flex-column gap-2">
            <button
              className="btn btn-secondary rounded-3"
              onClick={() => handleRemovefromCart(book.id)}
            >
              🗑️ Remove from Cart
            </button>
            <button
              className="btn btn-primary rounded-3"
              onClick={() => handleMoveTowishlist(book)}
            >
              Move to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {removeAlert && (
        <Modal
          show={removeAlert}
          message="Item removed from cart successfully"
        />
      )}
      {moveToWishlistAlert && (
        <Modal
          show={moveToWishlistAlert}
          message="Item moved to wishlist successfully."
        />
      )}
      {increaseAlert && <Modal show={increaseAlert} message="1 Item added" />}
      {decreaseAlert && <Modal show={decreaseAlert} message="1 Item removed" />}
    </div>
  );
};

export default Cartcard;
