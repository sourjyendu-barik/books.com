import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import BooksProvider from "./context/BookContext.jsx";
import App from "./App.jsx";
import BookListing from "./pages/BookListing.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Details from "./pages/Details.jsx";
import CartPage from "./pages/CartPage.jsx";
import Userprofile from "./components/Userprofile.jsx";
import Checkout from "./pages/Checkout.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/booklisting", element: <BookListing /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/booklisting/details/:bookId", element: <Details /> },
  { path: "/cartpage", element: <CartPage /> },
  { path: "/useprofile", element: <Userprofile /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "*", element: <h2>404 Page Not Found</h2> },
  { path: "/booklisting/category/:bookCategory", element: <BookListing /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BooksProvider>
      <RouterProvider router={router} />
    </BooksProvider>
  </StrictMode>
);
