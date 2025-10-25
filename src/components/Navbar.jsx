import React from "react";
import { NavLink } from "react-router";
import Cart from "./Cart";
import Wishcount from "./Wishcount";
import { User } from "lucide-react";
import { useBookContext } from "../context/BookContext";
const Navbar = () => {
  const { updateFilter, filters } = useBookContext();
  const handleInput = (e) => {
    updateFilter("bookname", e.target.value);
  };
  return (
    <div className="bg-light py-2 sticky-top shadow-sm">
      {/* Main flex container for equal spacing */}
      <nav className="d-flex justify-content-between container">
        {/* Left section - Site title / logo */}
        <div>
          <NavLink
            to="/"
            className="text-decoration-none text-dark fw-bold fs-5"
          >
            <i>Book.com</i>
          </NavLink>
        </div>

        {/* Middle section - Search bar */}

        <div className="input-group w-25">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            value={filters.bookname}
            onChange={handleInput}
          />
        </div>

        {/* Right section - Login, Cart, Wishlist */}
        <div className="d-flex justify-content-between gap-1 w-25">
          <button className="btn btn-secondary rounded-0 w-25">Login</button>
          <NavLink to="/cartpage">
            <Cart />
          </NavLink>
          <NavLink to="/wishlist">
            <Wishcount />
          </NavLink>
          <NavLink to="/useprofile">
            <User />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
