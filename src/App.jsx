import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Link, useNavigate } from "react-router";
function App() {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    navigate(`/booklisting/category/${categoryName}`);
  };
  return (
    <div>
      <Navbar />
      <main>
        <div className="container my-3">
          <section className="h-25">
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <img
                    src="https://cdn.pixabay.com/photo/2014/04/05/11/39/people-316506_1280.jpg"
                    alt="mathbookd"
                    className="img-fluid mb-2"
                    onClick={() => handleCategoryClick("Math")}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="col-md-3 mt-2">
                <img
                  src="https://cdn.pixabay.com/photo/2021/07/12/09/42/robot-6405858_1280.jpg"
                  alt="sciencebooks"
                  className="img-fluid mb-2"
                  onClick={() => handleCategoryClick("Science")}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="col-md-3">
                <img
                  src="https://cdn.pixabay.com/photo/2017/08/07/19/07/books-2606859_1280.jpg"
                  alt="Historybooks"
                  className="img-fluid mb-2"
                  onClick={() => handleCategoryClick("History")}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="col-md-3">
                <img
                  src="https://cdn.pixabay.com/photo/2017/07/11/14/53/atlas-2493824_1280.jpg"
                  alt="Geographybooks"
                  className="img-fluid mb-2"
                  onClick={() => handleCategoryClick("Geography")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </section>
          <section className="my-2">
            <Link to="/booklisting">
              <img
                src="https://cdn.pixabay.com/photo/2021/01/21/15/54/books-5937716_1280.jpg"
                alt=""
                className="books_coverpage"
                style={{ width: "100%", maxHeight: "30rem" }}
              />
            </Link>
          </section>
          <section>
            <div className="row g-2 align-items-stretch">
              {" "}
              {/* align-items-stretch ensures equal column height */}
              <div className="col-12 col-md-6">
                <div className="card p-3 h-100 d-flex flex-column">
                  <div className="row h-100">
                    {" "}
                    {/* full height row */}
                    <div className="col-md-4">
                      <img
                        src="https://cdn.pixabay.com/photo/2017/08/30/07/56/money-2696228_1280.jpg"
                        alt="investment"
                        className="img-fluid"
                        style={{ objectFit: "cover", cursor: "pointer" }}
                        onClick={() => handleCategoryClick("Investment")}
                      />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                      <p>New Arrivals</p>
                      <h5>Investment Books</h5>
                      <p>
                        Discover strategies to grow your wealth and make smart
                        financial decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="card p-3 h-100 d-flex flex-column">
                  <div className="row h-100">
                    <div className="col-md-4">
                      <img
                        src="https://cdn.pixabay.com/photo/2019/10/23/11/52/common-praise-4571350_1280.jpg"
                        alt=""
                        className="img-fluid"
                        style={{ objectFit: "cover", cursor: "pointer" }}
                        onClick={() => handleCategoryClick("English")}
                      />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                      <p>New Arrivals</p>
                      <h5>English Books</h5>
                      <p>
                        Explore captivating stories and improve your language
                        skills with our English collection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
