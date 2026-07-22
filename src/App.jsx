import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import BooksProvider from "./context/BookContext";
import AuthProvider from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <BooksProvider>
          <RouterProvider router={router} />
        </BooksProvider>
      </AuthProvider>
    </>
  );
}

export default App;
