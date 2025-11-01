import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Link, useNavigate } from "react-router";
import CategoryCard from "./components/CategoryCard";
import CategoryCardBottm from "./CategoryCardBottm";
import Footer from "./components/Footer";
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
              <CategoryCard
                image="https://cdn.pixabay.com/photo/2014/04/05/11/39/people-316506_1280.jpg"
                onClick={handleCategoryClick}
                name="Math"
              />
              <CategoryCard
                image="https://cdn.pixabay.com/photo/2021/07/12/09/42/robot-6405858_1280.jpg"
                onClick={handleCategoryClick}
                name="Science"
              />
              <CategoryCard
                image="https://cdn.pixabay.com/photo/2017/08/07/19/07/books-2606859_1280.jpg"
                onClick={handleCategoryClick}
                name={"History"}
              />
              <CategoryCard
                image="https://cdn.pixabay.com/photo/2017/07/11/14/53/atlas-2493824_1280.jpg"
                onClick={handleCategoryClick}
                name={"Geography"}
              />
            </div>
          </section>
          <section className="my-2 position-relative text-center">
            <Link to="/booklisting">
              <img
                src="https://cdn.pixabay.com/photo/2021/01/21/15/54/books-5937716_1280.jpg"
                alt="allbooks"
                className="books_coverpage"
                style={{ width: "100%", maxHeight: "30rem" }}
              />
              <div className="position-absolute top-50 start-50 fw-bold text-dark py-2 px-4 fs-3  bg-dark translate-middle bg-white rounded">
                All Books
              </div>
            </Link>
          </section>
          <section>
            <div className="row g-2 align-items-stretch">
              <CategoryCardBottm
                Image="https://cdn.pixabay.com/photo/2017/08/30/07/56/money-2696228_1280.jpg"
                text=" Discover strategies to grow your wealth and make smart financial decisions."
                name="Investment"
                onClick={handleCategoryClick}
              />
              <CategoryCardBottm
                Image="https://cdn.pixabay.com/photo/2019/10/23/11/52/common-praise-4571350_1280.jpg"
                text=" Explore captivating stories and improve your language skills with our English collection."
                name="English"
                onClick={handleCategoryClick}
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
