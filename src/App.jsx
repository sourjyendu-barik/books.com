import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import BooksProvider from "./context/BookContext";
import AuthProvider from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import LoadingComp from "./components/LoadingComp";
function App() {
  return (
    <>
      <AuthProvider>
        <AuthGate>
          <BooksProvider>
            <RouterProvider router={router} />
          </BooksProvider>
        </AuthGate>
      </AuthProvider>
    </>
  );
}

function AuthGate({ children }) {
  const { loading } = useAuth();
  if (loading) return <LoadingComp message="checking user data" />;
  return children;
}
export default App;
