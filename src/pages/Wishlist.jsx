import React from "react";
import Navbar from "../components/Navbar";
import { useBookContext } from "../context/BookContext";
import Product from "../components/Product";
const Wishlist = () => {
  const { wishlist, moveToCart } = useBookContext();
  return (
    <div>
      <Navbar />
      <section className="p-3">
        <div className="container">
          {wishlist.length === 0 && <h2>There are no items in wishlist</h2>}
          {wishlist.length > 0 && (
            <>
              <h2 className="text-center">My Wishlist</h2>
              <div className="row">
                {wishlist.map((book) => (
                  <Product
                    book={book}
                    key={book.id}
                    buttonLabel={"Move to Cart"}
                    buttonFunction={() => moveToCart(book)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
