import React from "react";
import Navbar from "../components/Navbar";
import Price from "../components/Price";
import { useParams } from "react-router";
import { useBookContext } from "../context/BookContext";
import { Heart, Truck, RotateCcw, CreditCard } from "lucide-react";
import Rating from "../components/Rating";
import Product from "../components/Product";

const Details = () => {
  const { bookId } = useParams();
  const { bookslist, toggleWishlist, addtoCart } = useBookContext();

  const book = bookslist.find((book) => book.id == bookId);
  const alike_booklist = [];

  for (const b of bookslist) {
    if (b.name !== book.name && b.category === book.category) {
      alike_booklist.push(b);
      if (alike_booklist.length === 4) break;
    }
  }

  return (
    <div>
      <Navbar />
      <main>
        <div className="container">
          <section className="my-4">
            <div className="row">
              {/* Left: Book Image Card */}
              <div className="col-md-3">
                <div
                  className="card text-center border-0 shadow-sm rounded-4 overflow-hidden"
                  style={{
                    position: "relative",
                    maxWidth: "25rem",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="position-relative">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-100"
                      style={{
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <span
                      className="rounded-circle bg-white p-2 shadow-sm"
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleWishlist(book)}
                    >
                      <Heart fill={book.isaddedinWhislist ? "red" : "white"} />
                    </span>
                  </div>

                  <div className="p-3">
                    <button className="btn btn-primary w-100 rounded-3 mb-2">
                      Buy Now
                    </button>
                    <button
                      className="btn btn-outline-secondary w-100 rounded-3"
                      onClick={() => addtoCart(book)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Book Details */}
              <div className="col-md-9">
                <div className="container">
                  <h3>{book.name}</h3>
                  <p className="fw-medium">Author: {book.author}</p>
                  <div className="d-flex align-items-center gap-2">
                    <span>{book.rating}</span>
                    <span>
                      <Rating rating={book.rating} />
                    </span>
                  </div>

                  <Price bookprice={book.price} />
                  <hr />

                  <div className="d-flex flex-column align-items-start mt-3">
                    <div className="d-flex align-items-center mb-2">
                      <RotateCcw size={18} className="me-2 text-secondary" />
                      <span>{book.returnPolicy}</span>
                    </div>

                    <div className="d-flex align-items-center mb-2">
                      <CreditCard size={18} className="me-2 text-secondary" />
                      <span>
                        {book.cashOnDelivery
                          ? "Cash on delivery"
                          : "Cash on delivery not available"}
                      </span>
                    </div>

                    <div className="d-flex align-items-center mb-2">
                      <Truck size={18} className="me-2 text-secondary" />
                      <span>
                        {book.deliveryCharges.applicable
                          ? `₹ ${book.deliveryCharges.charge}`
                          : "Free"}
                      </span>
                    </div>
                  </div>

                  <hr />
                  <ul>
                    {book.bookDescription.map((d, dindex) => (
                      <li key={`descripton${dindex}`}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <hr />
          <section>
            <h3>Books You May Like</h3>
            <div className="row">
              {alike_booklist.map((b, index) => (
                <Product
                  book={b}
                  buttonLabel={"Add to Cart"}
                  buttonFunction={addtoCart}
                  key={`alikebook${index}`}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Details;
