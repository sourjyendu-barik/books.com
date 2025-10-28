import React, { useState } from "react";
import { NavLink } from "react-router";
import Cart from "./Cart";
import Wishcount from "./Wishcount";
import { User, Menu } from "lucide-react";
import { useBookContext } from "../context/BookContext";

const Navbar = () => {
  const { updateFilter, filters } = useBookContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleInput = (e) => {
    updateFilter("bookname", e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="navbar-brand text-dark fw-bold fs-5 text-decoration-none"
        >
          <i>Book.com</i>
        </NavLink>

        {/* Hamburger for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Collapsible content */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          {/* Center - Search bar */}
          <div className="mx-auto my-2 my-lg-0" style={{ width: "25rem" }}>
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search..."
              value={filters.bookname}
              onChange={handleInput}
            />
          </div>

          {/* Right side */}
          <div className="d-flex align-items-center justify-content-end gap-5 mt-2 mt-lg-0 ms-lg-3">
            <button className="btn btn-secondary rounded-0 px-3 py-1">
              Login
            </button>
            <NavLink to="/cartpage" className="text-dark">
              <Cart />
            </NavLink>
            <NavLink to="/wishlist" className="text-dark">
              <Wishcount />
            </NavLink>
            <NavLink to="/useprofile" className="text-dark">
              <User />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
