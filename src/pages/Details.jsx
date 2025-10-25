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
  //console.log(bookId);
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
              <div className="col-md-3">
                <div
                  className="card text-center"
                  style={{ position: "relative", maxWidth: "25rem" }}
                >
                  <img src={book.image} alt={book.title} />
                  <span
                    className="rounded-pill bg-white"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleWishlist(book)}
                  >
                    <Heart fill={book.isaddedinWhislist ? "Red" : "White"} />
                  </span>
                  <button className="btn btn-primary rounded-0">
                    {" "}
                    Buy Now
                  </button>
                  <button
                    className="btn btn-secondary rounded-0 mt-2"
                    onClick={() => addtoCart(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="col-md-9">
                <div className="container">
                  <h3>{book.name}</h3>
                  <div className="d-flex align-items-center gap-2">
                    <span>{book.rating}</span>
                    <span>{<Rating rating={book.rating} />}</span>
                  </div>
                  {/* <div className="d-flex align-items-center gap-2">
                  <span className="fw-bold  fs-3">₹{presentprice}</span>
                  <span className="text-muted text-decoration-line-through fs-5">
                    ₹{orginal_Price}
                  </span>
                </div> */}
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
                  {/* <p className="fw-medium">{book.bookDescription}</p> */}
                  <ul>
                    {book.bookDescription.map((d, dindex) => (
                      <li className="" key={`descripton${dindex}`}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <hr />
          <section>
            <h3>Books You may Like</h3>
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
