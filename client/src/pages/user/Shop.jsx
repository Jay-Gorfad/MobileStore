import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductList from "../../components/user/ProductList";

export default function Shop() {
  const [filters, setFilters] = useState({ ratings: "", priceRange: "", discount: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClearFilters = () => {
    setFilters({ ratings: "", priceRange: "", discount: "" });
  };

  return (
               
    <div className="container mt-4 sitemap">
      <div className="row">
        <p className="my-5">
                    <Link to="/" className="text-decoration-none dim link">Home /</Link>
                    Shop
                </p>
        {/* Filter Sidebar */}
        <div className="col-md-3 mt-3">
          <div className="filter-box p-3 border rounded shadow-sm bg-light">
            <h5 className="mb-3">Filters</h5>

            {/* Customer Ratings */}
            <div className="mb-3">
              <h6>Customer Ratings</h6>
              {[4, 3, 2, 1].map((rating) => (
                <div className="form-check" key={rating}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ratings"
                    value={rating}
                    checked={filters.ratings === String(rating)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{rating} ★ & above</label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-3">
              <h6>Price Range</h6>
              {["lt50", "51to100", "101to200", "201to500", "gt500"].map((price) => (
                <div className="form-check" key={price}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priceRange"
                    value={price}
                    checked={filters.priceRange === price}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {price === "lt50" ? "Less than ₹50" :
                    price === "51to100" ? "₹51 - ₹100" :
                    price === "101to200" ? "₹101 - ₹200" :
                    price === "201to500" ? "₹201 - ₹500" : "More than ₹500"}
                  </label>
                </div>
              ))}
            </div>

            {/* Discount */}
            <div className="mb-3">
              <h6>Discount</h6>
              {["lt5", "5to15", "15to25", "gt25"].map((discount) => (
                <div className="form-check" key={discount}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="discount"
                    value={discount}
                    checked={filters.discount === discount}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {discount === "lt5" ? "Less than 5%" :
                    discount === "5to15" ? "5% - 15%" :
                    discount === "15to25" ? "15% - 25%" : "More than 25%"}
                  </label>
                </div>
              ))}
            </div>

            {/* Clear Filters Button */}
            <button className="btn btn-primary w-100" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="col-md-9">
          <ProductList />
        </div>
      </div>
    </div>
  );
}