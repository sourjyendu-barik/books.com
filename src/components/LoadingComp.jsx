const LoadingComp = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="mt-3 fs-5">{message}</p>
      </div>
    </div>
  );
};

export default LoadingComp;
