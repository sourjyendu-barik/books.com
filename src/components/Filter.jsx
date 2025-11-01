import React from "react";
import Checkbox from "./Checkbox";
import RadioButton from "./RadioButton";
import { useBookContext } from "../context/BookContext";
import useFetch from "../hooks/useFetch";
const Filter = () => {
  const { filters, updateFilter } = useBookContext();
  const { data, loading, error } = useFetch(
    "https://books-com-backend.vercel.app/api/categories"
  );
  const clearFilters = () => {
    updateFilter("category", []);
    updateFilter("rating", null);
    updateFilter("price", 2000);
    updateFilter("sort", null);
  };
  const handleRating = (e) => {
    updateFilter("rating", Number(e.target.value));
  };

  const handleSorting = (e) => {
    updateFilter("sort", e.target.value);
  };

  const handlePrice = (e) => {
    updateFilter("price", Number(e.target.value));
  };

  const handleCategory = (label, checked) => {
    let newCategoryList = [...filters.category];
    if (checked) {
      newCategoryList.push(label);
    } else {
      newCategoryList = newCategoryList.filter((c) => c !== label);
    }
    updateFilter("category", newCategoryList);
  };
  return (
    <aside className="p-3 mt-3">
      <section className="d-flex justify-content-between">
        <h6>Filter</h6>
        <p style={{ cursor: "pointer", color: "blue" }} onClick={clearFilters}>
          Clear
        </p>
      </section>

      <h6 className="mt-2">Price</h6>
      <div className="position-relative mt-3">
        <input
          type="range"
          className="form-range"
          min="500"
          max="2000"
          step="1"
          value={filters.price}
          onChange={handlePrice}
        />
        <div
          className="d-flex justify-content-between position-absolute w-100"
          style={{ top: "-1rem", left: 0 }}
        >
          <span>500</span>
          <span>1000</span>
          <span>2000</span>
        </div>
      </div>

      <h6 className="mt-2">Category</h6>
      {loading && <p>Loading Category</p>}
      {error && <p>Error while loading category</p>}
      {data &&
        data.data &&
        data.data.categories.length > 0 &&
        data.data.categories.map((c, index) => (
          <Checkbox
            label={c}
            key={`category${index}`}
            name="category"
            checked={filters.category.includes(c)}
            handleFilter={handleCategory}
          />
        ))}

      <h6 className="mt-2">Rating</h6>

      {[4, 3, 2, 1].map((star) => {
        return (
          <RadioButton
            key={star}
            label={`${star} star and above`}
            name="rating"
            value={star}
            handleFilter={handleRating}
            checked={filters.rating === star}
          />
        );
      })}

      <h6 className="mt-3">Sort</h6>
      <RadioButton
        label="Price: High to Low"
        name="sort"
        value="hightolow"
        checked={filters.sort === "hightolow"}
        handleFilter={handleSorting}
      />
      <RadioButton
        label="Price: Low to High"
        name="sort"
        value="lowtohigh"
        checked={filters.sort === "lowtohigh"}
        handleFilter={handleSorting}
      />
    </aside>
  );
};

export default Filter;
