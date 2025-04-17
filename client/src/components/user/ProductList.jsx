import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = ({ filters={ ratings: "", priceRange: "", discount: "" } }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/products", {
        params: {
          rating: filters.ratings,
          priceRange: filters.priceRange,
          discount: filters.discount
        }
      });
      setProducts(res.data || []);
    } catch (err) {
      alert("Failed to fetch products");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleWishlistClick = () => {
    alert("Product added to wishlist successfully!");
  };

  return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => {
          const isOutOfStock = product.stock <= 0;
          const averageRating = parseFloat(product.averageRating || 0);
          const fullStars = Math.floor(averageRating);
          const halfStar = averageRating % 1 >= 0.5;
          const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

          return (
            <div key={product._id} className="col">
              <div className={`card h-100 border-0 shadow-sm rounded-3 ${isOutOfStock ? "opacity-75" : ""}`}>
                <div className="position-relative">
                  <Link to={`/product/${product._id}`} className="text-decoration-none">
                    <img
                      className="card-img-top p-3 rounded-3"
                      style={{ height: "240px", objectFit: "contain" }}
                      src={product.productImage}
                      alt={product.productName}
                    />
                  </Link>
                  {product.discount > 0 && (
                    <span className="position-absolute top-0 start-0 bg-primary text-white m-3 px-2 py-1 rounded-pill small">
                      -{product.discount}% OFF
                    </span>
                  )}
                  <button
                    className="btn position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow-sm"
                    onClick={handleWishlistClick}
                    style={{ width: "35px", height: "35px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <i className="fa-regular fa-heart text-primary small"></i>
                  </button>
                </div>

                <div className="card-body d-flex flex-column pt-2 justify-content-center align-items-center">
                  <Link to={`/product/${product._id}`} className="text-decoration-none">
                    <h6 className="card-title text-dark mb-1 medium fw-semibold text-nowrap">
                      {product.productName}
                    </h6>
                  </Link>

                  <small className="text-muted mb-2 smaller">
                    {product.categoryId?.name || "Uncategorized"}
                  </small>

                  <div className="mb-2">
                    <span className="fw-bold text-primary me-2">₹{product.costPrice}</span>
                    <span className="text-muted text-decoration-line-through small">₹{product.salePrice}</span>
                  </div>

                  {/* ⭐ Rating Stars + Total Reviews */}
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-2">
                      {[...Array(fullStars)].map((_, i) => (
                        <i key={`full-${i}`} className="fa fa-star text-warning" style={{ fontSize: "0.8rem" }}></i>
                      ))}
                      {halfStar && <i className="fa fa-star-half-alt text-warning" style={{ fontSize: "0.8rem" }}></i>}
                      {[...Array(emptyStars)].map((_, i) => (
                        <i key={`empty-${i}`} className="fa fa-star text-muted" style={{ fontSize: "0.8rem" }}></i>
                      ))}
                    </div>
                    <small className="text-muted smaller">({product.totalReviews})</small>
                  </div>

                  {isOutOfStock ? (
                    <button className="btn btn-outline-danger btn-md w-100 mt-auto rounded-pill" disabled>
                      Out of Stock
                    </button>
                  ) : (
                    <Link
                      to="/cart"
                      className="btn btn-primary btn-md p-2 w-100 mt-auto rounded-pill d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="fa fa-shopping-cart small"></i>
                      <span className="small">Add to Cart</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
