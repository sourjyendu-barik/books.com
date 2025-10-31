import React from "react";
import Navbar from "../components/Navbar";
import Price from "../components/Price";
import { useNavigate, useParams } from "react-router";
import { useBookContext } from "../context/BookContext";
import { Heart, Truck, RotateCcw, CreditCard, Heading2 } from "lucide-react";
import Rating from "../components/Rating";
import Product from "../components/Product";
import useFetch from "../hooks/useFetch";
import { useMemo } from "react";
const Details = () => {
  const { bookId } = useParams();
  const { bookslist, toggleWishlist, addtoCart, wishlist } = useBookContext();

  const { data, loading, error } = useFetch(
    `https://books-com-backend.vercel.app/api/products/${bookId}`
  );

  const alike_booklist = useMemo(() => {
    const product = data?.data?.product;
    if (!product || bookslist.length === 0) return [];
    let alike = [];
    for (const b of bookslist) {
      if (b._id !== product._id && b.category === product.category) {
        alike.push(b);
        if (alike.length === 4) break;
      }
    }
    return alike;
  }, [data?.data?.product, bookslist]);

  const navigate = useNavigate();
  const handleBuyNow = (book) => {
    const bookWithCount = { ...book, count: 1 };

    navigate("/checkout", {
      state: {
        from: "details",
        bookWithCount,
      },
    });
  };
  return (
    <div>
      <Navbar />
      <main>
        <div className="container">
          {loading && (
            <h2 className="p3 text-center">Book details is loading</h2>
          )}
          {error && (
            <h2 className="p3 text-center">Error while loading data</h2>
          )}
          {data && data.data && data.data.product && (
            <div>
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
                          src={data.data.product.image}
                          alt={data.data.product.title}
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
                          onClick={() => toggleWishlist(data.data.product)}
                        >
                          <Heart
                            fill={
                              wishlist.some(
                                (item) => item._id === data.data.product._id //modified
                              )
                                ? "red"
                                : "white"
                            }
                          />
                        </span>
                      </div>

                      <div className="p-3">
                        <button
                          className="btn btn-primary w-100 rounded-3 mb-2"
                          onClick={() => handleBuyNow(data.data.product)}
                        >
                          Buy Now
                        </button>
                        <button
                          className="btn btn-outline-secondary w-100 rounded-3"
                          onClick={() => addtoCart(data.data.product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Book Details */}
                  <div className="col-md-9">
                    <div className="container">
                      <h3>{data.data.product.name}</h3>
                      <p className="fw-medium">
                        Author: {data.data.product.author}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <span>{data.data.product.rating}</span>
                        <span>
                          <Rating rating={data.data.product.rating} />
                        </span>
                      </div>

                      <Price bookprice={data.data.product.price} />
                      <hr />

                      <div className="d-flex flex-column align-items-start mt-3">
                        <div className="d-flex align-items-center mb-2">
                          <RotateCcw
                            size={18}
                            className="me-2 text-secondary"
                          />
                          <span>{data.data.product.returnPolicy}</span>
                        </div>

                        <div className="d-flex align-items-center mb-2">
                          <CreditCard
                            size={18}
                            className="me-2 text-secondary"
                          />
                          <span>
                            {data.data.product.cashOnDelivery
                              ? "Cash on delivery"
                              : "Cash on delivery not available"}
                          </span>
                        </div>

                        <div className="d-flex align-items-center mb-2">
                          <Truck size={18} className="me-2 text-secondary" />
                          <span>
                            {data.data.product.deliveryCharges.applicable
                              ? `₹ ${data.data.product.deliveryCharges.charge}`
                              : "Free"}
                          </span>
                        </div>
                      </div>

                      <hr />
                      <ul>
                        {data.data.product.bookDescription?.map((d, dindex) => (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Details;
