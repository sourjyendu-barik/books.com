import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useBookContext } from "../context/BookContext";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
const Wishlist = () => {
  const { wishlist, moveToCart } = useBookContext();
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const handleMovetoCart = (b) => {
    setMsg(`${b.name} moved to cart`);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 800);
    setTimeout(() => {
      moveToCart(b);
    }, 800);
  };
  return (
    <div>
      <Navbar />
      <section className="p-3">
        <h1 className="text-center">Wish List</h1>
        <div className="container">
          {wishlist.length === 0 && <h2>There are no items in wishlist</h2>}
          {wishlist.length > 0 && (
            <>
              <div className="row">
                {wishlist.map((book) => (
                  <Product
                    book={book}
                    key={book.id}
                    buttonLabel={"Move to Cart"}
                    buttonFunction={() => handleMovetoCart(book)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
      <Modal show={showModal} message={msg} />
    </div>
  );
};

export default Wishlist;
