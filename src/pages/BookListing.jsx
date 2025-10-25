import React, { useEffect, useState } from "react";
import { useBookContext } from "../context/BookContext";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import { useParams } from "react-router";
const BookListing = () => {
  const { sortedBooks, addtoCart, filters, updateFilter } = useBookContext();
  const { bookCategory } = useParams();
  const [showModel, setShowmodel] = useState(false);
  const handleAddtoCart = (book) => {
    addtoCart(book);
    setShowmodel(true);
    setTimeout(() => {
      setShowmodel(false);
    }, 2000);
  };

  useEffect(() => {
    if (bookCategory) {
      const categorylist = [...filters.category, bookCategory];
      updateFilter("category", categorylist);
    }
    return () => {
      updateFilter("category", []);
    };
  }, [bookCategory]);

  //console.log("sortedbooks", sortedBooks);
  return (
    <div>
      <Navbar />
      <main className="mt-3">
        <div className="row">
          <div
            className="col-md-2 position-sticky"
            style={{
              top: "90px",
              height: "calc(100vh - 90px)",
              overflowY: "auto",
            }}
          >
            <Filter />
          </div>
          <div className="col-md-10">
            <section className="container">
              <div className="row">
                {sortedBooks.map((book, bookId) => {
                  return (
                    <Product
                      book={book}
                      key={bookId}
                      buttonLabel={"Add to Cart"}
                      buttonFunction={() => handleAddtoCart(book)}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        </div>
        {showModel && (
          <Modal
            show={showModel}
            message="New item added in cart successfully."
          />
        )}
      </main>
    </div>
  );
};

export default BookListing;
