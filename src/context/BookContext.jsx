import { createContext, useContext, useEffect, useMemo, useState } from "react";
const BookContext = createContext();
import useLocalstorage from "../hooks/useLocalstorage";
import useFetch from "../hooks/useFetch";

export default function BooksProvider({ children }) {
  const { data, loading, error } = useFetch(
    "https://books-com-backend.vercel.app/api/products"
  );
  const [bookslist, setBooksList] = useState([]);
  const [wishlist, setWishlist] = useLocalstorage("wishlist", []);
  const [cartitems, setcartitems] = useLocalstorage("cartItems", []);
  const [currentAddress, setCurrentAdress] = useState(null);

  //   Addrd this effect to load fetched data into bookslist
  useEffect(() => {
    if (!data?.data?.products) return;

    setBooksList(
      data.data.products.map((book) => ({
        ...book,
        isaddedinWhislist: wishlist.some((w) => w.id === book.id),
      }))
    );
  }, [data, wishlist]);

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
      dist: "Cuttack",
      state: "Odisha",
      pin: "700001",
    },
  ]);

  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  //  Wishlist
  const toggleWishlist = (book) => {
    const updatedBooks = bookslist.map((b) =>
      b.id === book.id ? { ...b, isaddedinWhislist: !b.isaddedinWhislist } : b
    );
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

  //  Filtering
  const filteredBooks = useMemo(() => {
    let filtered = [...bookslist];
    if (filters.category.length > 0) {
      filtered = filtered.filter((b) => filters.category.includes(b.category));
    }
    if (filters.price) {
      filtered = filtered.filter(
        (b) => b.price.discountedPrice <= filters.price
      );
    }
    if (filters.rating) {
      filtered = filtered.filter((b) => b.rating >= filters.rating);
    }
    if (filters.bookname) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(filters.bookname.toLowerCase())
      );
    }
    return filtered;
  }, [
    bookslist,
    filters.category,
    filters.price,
    filters.rating,
    filters.bookname,
  ]);

  //  Sorting
  const sortedBooks = useMemo(() => {
    const arr = [...filteredBooks];
    if (filters.sort === "lowtohigh") {
      arr.sort((a, b) => a.price.discountedPrice - b.price.discountedPrice);
    } else if (filters.sort === "hightolow") {
      arr.sort((a, b) => b.price.discountedPrice - a.price.discountedPrice);
    }
    return arr;
  }, [filteredBooks, filters.sort]);

  //  Cart operations
  const addtoCart = (book) => {
    setcartitems((prev) => {
      const exist = prev.find((b) => b.id === book.id);
      if (exist) {
        return prev.map((b) =>
          b.id === book.id ? { ...b, count: b.count + 1 } : b
        );
      }
      return [...prev, { ...book, count: 1 }];
    });
  };

  const addItemCount = (book_id) => {
    setcartitems((prev) =>
      prev.map((b) => (b.id === book_id ? { ...b, count: b.count + 1 } : b))
    );
  };

  const decreaseItemCount = (book_id) => {
    setcartitems((prev) =>
      prev
        .map((b) => (b.id === book_id ? { ...b, count: b.count - 1 } : b))
        .filter((b) => b.count > 0)
    );
  };

  const removeFromCart = (book_id) => {
    setcartitems((prev) => prev.filter((b) => b.id !== book_id));
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
  //Wishlist  operation
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
    currentAddress,
    setCurrentAdress,
    data,
    loading,
    error,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export const useBookContext = () => useContext(BookContext);
