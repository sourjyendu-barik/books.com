import React from "react";
import { Heart } from "lucide-react";
import { useBookContext } from "../context/BookContext";
import { Link } from "react-router";
const Product = ({ book, buttonLabel, buttonFunction }) => {
  const { toggleWishlist } = useBookContext();
  //const navigate = useNavigate();
  // const onclickhandler = navigate(`/booklisting/${book.id}`);
  //console.log(book);
  return (
    //
    <div className="col-md-3 mb-4" style={{ maxWidth: "28rem" }}>
      <div
        className="card position-relative"
        // onClick={() => onclickhandler}
        // style={{ cursor: "pointer" }}
      >
        <Link to={`/booklisting/${book.id}`}>
          <img
            src={book.image}
            style={{
              objectFit: "cover",
              width: "100%",
            }}
            className="img-fluid"
            alt={book.name}
          />
        </Link>
        <span
          className="rounded-pill position-absolute"
          style={{
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
          }}
          onClick={() => toggleWishlist(book)}
        >
          <Heart fill={book.isaddedinWhislist ? "Red" : "White"} />
        </span>
        <div className="card-body text-center">
          <p className="fs-6">{book.name}</p>
          <p className="fs-3 my-0">
            <strong> ₹{book.price.discountedPrice} </strong>
          </p>
        </div>
        <button
          className="btn btn-secondary rounded-0"
          onClick={() => buttonFunction(book)}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Product;
