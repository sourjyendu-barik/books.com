import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingComp from "./components/LoadingComp"; //message=""

import PublicRoutes from "./pages/authpages/PublicRoutes";
import ProtectedRoutes from "./pages/authpages/ProtectedRoutes";

const BookListing = lazy(() => import("./pages/BookListing"));
const Details = lazy(() => import("./pages/Details"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Userprofile = lazy(() => import("./components/Userprofile"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

const withSuspense = (component, message = "Loading...") => (
  <Suspense fallback={<LoadingComp message={message} />}>{component}</Suspense>
);

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/signin" replace /> },

  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/signin",
        element: withSuspense(<SignIn />, "Loading Sign In..."),
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/booklisting",
        element: withSuspense(<BookListing />, "Loading Books..."),
      },
      {
        path: "/wishlist",
        element: withSuspense(<Wishlist />, "Loading Wishlist..."),
      },
      {
        path: "/booklisting/details/:bookId",
        element: withSuspense(<Details />, "Loading Book Details..."),
      },
      {
        path: "/cartpage",
        element: withSuspense(<CartPage />, "Loading Cart..."),
      },
      {
        path: "/useprofile",
        element: withSuspense(<Userprofile />, "Loading Profile..."),
      },
      {
        path: "/checkout",
        element: withSuspense(<Checkout />, "Loading Checkout..."),
      },
      {
        path: "/dashboard",
        element: withSuspense(<Dashboard />, "Loading Dashboard..."),
      },
      {
        path: "/booklisting/category/:bookCategory",
        element: withSuspense(<BookListing />, "Loading Category..."),
      },
    ],
  },
  { path: "*", element: <h2 className="p-4">404 Page Not Found</h2> },
]);

export default router;
