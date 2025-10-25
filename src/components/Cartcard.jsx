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
    setTimeout(() => {
      setIncreaseAlert(false);
    }, 1000);
  };
  const handleDecreaseCount = (book_id) => {
    decreaseItemCount(book_id);
    setDecreaseAlert(true);
    setTimeout(() => {
      setDecreaseAlert(false);
    }, 1000);
  };
  const handleRemovefromCart = (bookId) => {
    setRemoveAlert(true);
    setTimeout(() => {
      setRemoveAlert(false);
    }, 2000);
    removeFromCart(bookId);
  };
  const handleMoveTowishlist = (book) => {
    setMovetoWishlistAlert(true);
    setTimeout(() => {
      setMovetoWishlistAlert(false);
    }, 2000);
    moveToWishlist(book);
  };
  return (
    <div className="card mt-3">
      <div className="row">
        <div className="col-md-5">
          <img
            src={book.image}
            alt={book.name}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            className="img-fluid"
          />
        </div>
        <div className="col-md-7 p-3">
          <div className="card-body">
            <p className="fw-medium fs-4">{book.name}</p>
            <Price bookprice={book.price} />
            <div>
              <span>Quantity:</span>
              <button
                className="btn btn-secondary btn-sm m-1"
                // onClick={() => addItemCount(book.id)}
                onClick={() => handleAddItemCount(book.id)}
              >
                +
              </button>
              <span className="m-1">{book.count}</span>
              <button
                className="btn btn-secondary btn-sm m-1"
                // onClick={() => decreaseItemCount(book.id)}
                onClick={() => handleDecreaseCount(book.id)}
              >
                -
              </button>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-secondary w-100"
              // onClick={() => removeFromCart(book.id)}
              onClick={() => handleRemovefromCart(book.id)}
            >
              Remove from Cart
            </button>
            <button
              className="btn btn-primary w-100"
              // onClick={() => moveToWishlist(book)}
              onClick={() => handleMoveTowishlist(book)}
            >
              Move to wishlist
            </button>
          </div>
        </div>
      </div>
      {removeAlert && (
        <Modal
          show={removeAlert}
          message="Item removed from cart successfully"
        />
      )}
      {moveToWishlistAlert && (
        <Modal
          show={moveToWishlistAlert}
          message="Move item to wishlist successfully."
        />
      )}
      {increaseAlert && <Modal show={increaseAlert} message="1 Item added" />}
      {decreaseAlert && <Modal show={decreaseAlert} message="1 item removed" />}
    </div>
  );
};
export default Cartcard;
