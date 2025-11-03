import React, { useEffect, useState } from "react";
import { useBookContext } from "../context/BookContext";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import { useParams } from "react-router";
import Footer from "../components/Footer";
const BookListing = () => {
  const { sortedBooks, addtoCart, filters, updateFilter, loading, error } =
    useBookContext();
  const { bookCategory } = useParams();
  const [showModel, setShowmodel] = useState(false);
  const handleAddtoCart = (book) => {
    addtoCart(book);
    setShowmodel(true);
    setTimeout(() => {
      setShowmodel(false);
    }, 600);
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
  return (
    <div>
      <Navbar />
      <main className="mt-3" style={{ paddingBottom: "5rem" }}>
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-md-2">
              <Filter />
            </div>
            <div className="col-md-10">
              <section className="container">
                <h3 className="text-center bg-white py-2">
                  Books({sortedBooks.length})
                </h3>

                <div className="row">
                  {loading && <p>Loading books.....</p>}
                  {error && <p>Error while loading books.</p>}
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
        </div>
      </main>
      <Footer />
      <Modal show={showModel} message="Item added in cart successfully" />
    </div>
  );
};

export default BookListing;
