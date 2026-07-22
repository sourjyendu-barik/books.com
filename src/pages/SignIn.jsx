import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (authResult) => {
    setLoading(true);
    try {
      if (authResult[`code`]) {
        await login(authResult.code);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handlError = async (errorResult) => {
    console.error(errorResult);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handlError,
    flow: "auth-code",
  });
  // if (loading) {
  //   return <p></p>
  // }
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-white bg-sm-light">
      <div
        className="w-100 d-flex flex-column justify-content-center p-4 p-sm-5 border-sm rounded-4 shadow-sm"
        style={{ maxWidth: "420px" }}
      >
        <div className="text-center">
          <div className="mb-4 d-flex justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center text-white fw-bold fs-3"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                backgroundColor: "#212529",
              }}
            >
              B
            </div>
          </div>

          <h2 className="fw-semibold text-dark mb-2">Welcome to Books.com</h2>

          <p className="text-muted mb-4">
            Sign in or create your account in one click
          </p>

          <button
            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-3"
            onClick={() => googleLogin()}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width="20"
            />
            Continue with Google
          </button>

          <p className="d-flex justify-content-center align-items-center gap-1 text-muted small mt-4 mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z"
              />
            </svg>
            Secure authentication powered by Google OAuth
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
