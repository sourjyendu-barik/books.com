import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useBookContext } from "../context/BookContext";
import { Link } from "react-router";
import Rating from "./Rating";
import Modal from "./Modal";
const Product = ({ book, buttonLabel, buttonFunction }) => {
  const { toggleWishlist } = useBookContext();
  const [modal, showModal] = useState(false);
  const [msg, setMsg] = useState("");
  const handleToggleWishlist = (book) => {
    // toggleWishlist(book);
    const message = book.isaddedinWhislist
      ? "Removed from wishlist"
      : "Added in wishlist";
    setMsg(message);
    showModal(true);
    setTimeout(() => {
      showModal(false);
    }, 800);
    setTimeout(() => {
      toggleWishlist(book);
    }, 500);
  };
  const handleAddToCart = (book) => {
    buttonFunction(book);
  };
  return (
    <div className="col-md-3 col-sm-6 mb-4 d-flex">
      <div
        className="card position-relative shadow-sm border-0 rounded-4 overflow-hidden h-100 w-100"
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          maxWidth: "25rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        }}
      >
        <div className="overflow-hidden" style={{ height: "250px" }}>
          <Link to={`/booklisting/details/${book._id}`}>
            <img
              src={book.image}
              alt={book.name}
              className="img-fluid w-100"
              style={{
                height: "100%", // image fills fixed height
                objectFit: "cover", //image proportional
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </Link>
        </div>

        {/* Wishlist button */}
        <span
          className="rounded-circle position-absolute bg-white shadow-sm d-flex justify-content-center align-items-center"
          style={{
            top: "1rem",
            right: "1rem",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => handleToggleWishlist(book)}
        >
          <Heart
            size={22}
            color={book.isaddedinWhislist ? "red" : "gray"}
            fill={book.isaddedinWhislist ? "red" : "white"}
          />
        </span>

        <div className="card-body text-center d-flex flex-column justify-content-between">
          <div>
            <p className="fw-semibold fs-6 text-truncate mb-1">{book.name}</p>
            <p className="fs-4 fw-bold text-dark mb-2">
              ₹{book.price.discountedPrice}
            </p>

            <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
              <span className="fw-medium text-muted">{book.rating}</span>
              <Rating rating={book.rating} />
            </div>
          </div>
        </div>

        <button
          className="btn btn-dark rounded-0 py-2 w-100 mt-auto"
          style={{
            fontWeight: "500",
            letterSpacing: "0.5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#343a40cc")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#212529")
          }
          onClick={() => handleAddToCart(book)}
        >
          {buttonLabel}
        </button>
      </div>
      <Modal show={modal} message={msg} />
    </div>
  );
};

export default Product;
