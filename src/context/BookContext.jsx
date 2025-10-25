import { createContext, useContext, useEffect, useMemo, useState } from "react";
const BookContext = createContext();
import books from "../data.json";
import useLocalstorage from "../hooks/useLocalstorage";
export default function BooksProvider({ children }) {
  const [bookslist, setBooksList] = useState(books);
  const [wishlist, setWishlist] = useLocalstorage("wishlist", []);
  const [cartitems, setcartitems] = useLocalstorage("cartItems", []);
  // const [total, setTotal] = useState([{total}]);
  const [filters, setFilters] = useState({
    category: [],
    rating: null,
    price: 2000,
    sort: null,
    bookname: "",
  });
  const [orders, setOrders] = useLocalstorage("orders", []);
  const [address, setAddress] = useLocalstorage("addressList", [
    {
      address_id: 1,
      house: "456house",
      dist: "Cutttuck",
      state: "Odisha",
      pin: "700001",
    },
  ]);
  //1
  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };
  //2

  //wishlist operation
  const toggleWishlist = (book) => {
    const updatedBooks = bookslist.map((b) => {
      if (b.id === book.id) {
        return { ...b, isaddedinWhislist: !b.isaddedinWhislist };
      } else {
        return b;
      }
    });
    setBooksList(updatedBooks);

    setWishlist((prev) => {
      const exist = prev.some((b) => b.id === book.id);
      if (exist) {
        return prev.filter((b) => b.id !== book.id);
      } else {
        const updatedBook = updatedBooks.find((b) => b.id === book.id);
        return [...prev, updatedBook];
      }
    });
  };
  //3
  const filteredBooks = useMemo(() => {
    let filteredBooksarray = [...bookslist];
    if (filters.category.length > 0) {
      filteredBooksarray = filteredBooksarray.filter((b) =>
        filters.category.includes(b.category)
      );
    }
    if (filters.price) {
      filteredBooksarray = filteredBooksarray.filter(
        (b) => b.price.discountedPrice <= filters.price
      );
    }
    if (filters.rating) {
      filteredBooksarray = filteredBooksarray.filter(
        (b) => b.rating >= filters.rating
      );
    }
    if (filters.bookname) {
      filteredBooksarray = filteredBooksarray.filter((b) =>
        b.name.toLowerCase().includes(filters.bookname.toLowerCase())
      );
    }

    return filteredBooksarray;
  }, [
    bookslist,
    filters.category,
    filters.price,
    filters.rating,
    filters.bookname,
  ]);
  //console.log(`filtered books is ${filteredBooks}`);
  const sortedBooks = useMemo(() => {
    let booksarr = [...filteredBooks];
    if (filters.sort === "lowtohigh") {
      booksarr.sort(
        (a, b) => a.price.discountedPrice - b.price.discountedPrice
      );
    } else if (filters.sort === "hightolow") {
      booksarr.sort(
        (a, b) => b.price.discountedPrice - a.price.discountedPrice
      );
    }
    return booksarr;
  }, [filteredBooks, filters.sort]);
  //

  //cart operation
  const addtoCart = (book) => {
    setcartitems((prev) => {
      const exist = prev.find((b) => b.name === book.name);
      let updatedCart;
      if (exist) {
        updatedCart = prev.map((b) =>
          b.name === book.name ? { ...b, count: b.count + 1 } : b
        );
      } else {
        updatedCart = [...prev, { ...book, count: 1 }];
      }

      return updatedCart;
    });
  };
  const addItemCount = (book_id) => {
    setcartitems((prev) => {
      const updatedCartlist = prev.map((b) =>
        b.id === book_id ? { ...b, count: b.count + 1 } : b
      );

      return updatedCartlist;
    });
  };
  const decreaseItemCount = (book_id) => {
    setcartitems((prev) => {
      const updatedCartlist = prev
        .map((b) => (b.id === book_id ? { ...b, count: b.count - 1 } : b))
        .filter((b) => b.count > 0);

      return updatedCartlist;
    });
  };
  const removeFromCart = (book_id) => {
    setcartitems((prev) => prev.filter((book) => book.id !== book_id));
  };

  const moveToCart = (book) => {
    setBooksList((prev) =>
      prev.map((b) =>
        b.id === book.id ? { ...b, isaddedinWhislist: false } : b
      )
    );

    setWishlist((prev) => prev.filter((b) => b.id !== book.id));

    addtoCart(book);
  };

  const moveToWishlist = (book) => {
    removeFromCart(book.id);

    setBooksList((prev) =>
      prev.map((b) =>
        b.id === book.id ? { ...b, isaddedinWhislist: true } : b
      )
    );

    setWishlist((prev) => {
      const exist = prev.some((b) => b.id === book.id);
      return exist ? prev : [...prev, { ...book, isaddedinWhislist: true }];
    });
  };

  // Sync wishlist state with book list on load or when wishlist changes
  useEffect(() => {
    setBooksList((prevBooks) =>
      prevBooks.map((book) => ({
        ...book,
        isaddedinWhislist: wishlist.some((w) => w.id === book.id),
      }))
    );
  }, [wishlist]);

  const value = {
    address,
    orders,
    bookslist,
    filters,
    sortedBooks,
    wishlist,
    cartitems,
    addtoCart,
    removeFromCart,
    toggleWishlist,
    updateFilter,
    addItemCount,
    moveToCart,
    moveToWishlist,
    decreaseItemCount,
    setOrders,
    setAddress,
    setcartitems,
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export const useBookContext = () => useContext(BookContext);
