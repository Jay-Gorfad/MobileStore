import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const ProductList = ({ products }) => {
  const { user, updateCartCount, updateWishlistCount } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      setLoadingWishlist(true);
      try {
        const response = await axios.get(`http://localhost:8000/wishlist/${user._id}`);
        const productIds = response.data.wishlist?.productIds.map(p => p._id);
        setWishlist(productIds || []);
      } catch (error) {
        // toast.error("Failed to fetch wishlist.");
      } finally {
        setLoadingWishlist(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (productId) => {
    if (!user) {
      toast.error("Please log in to use wishlist.");
      return;
    }

    try {
      if (wishlist.includes(productId)) {
        await axios.delete(`http://localhost:8000/wishlist/${user._id}/remove`, {
          data: { productId },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.info("Product removed from wishlist.");
      } else {
        const res = await axios.post(`http://localhost:8000/wishlist/${user._id}/add`, {
          productId,
        });
        setWishlist((prev) => [...prev, productId]);
        toast.success("Product added to wishlist.");
        if (res.data?.wishlist?.productIds?.length >= 0) {
          updateWishlistCount(res.data.wishlist.productIds.length);
        }
      }
    } catch (error) {
      toast.error("Wishlist update failed.");
    }
  };

  const handleAddToCartClick = async (productId) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    setAddingToCartId(productId);
    try {
      const response = await axios.post(`http://localhost:8000/cart`, {
        userId: user._id,
        productId,
        quantity: 1,
      });

      toast.success("Product added to cart successfully!");
      if (response.data?.items?.length) {
        updateCartCount(response.data.items.length);
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
    } finally {
      setAddingToCartId(null);
    }
  };

  return (
    <div className="row justify-content-start align-items-stretch">
      {!currentProducts || currentProducts.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        currentProducts.map((product) => {
          const isOutOfStock = product.stock <= 0;
          const discountedPrice = (product.salePrice - (product.salePrice * product.discount) / 100).toFixed(2);
          const isInWishlist = wishlist.includes(product._id);

          return (
            <div key={product._id} className="col-lg-3 col-md-4 col-6 p-2">
              <div className={`card h-100 shadow-sm border-0 rounded ${isOutOfStock ? 'disabled-card' : ''}`}>
                <div className="position-relative text-center">
                  <Link to={`/product/${product._id}`}>
                    <img
                      className="img-fluid p-3"
                      style={{ height: "230px", objectFit: "contain" }}
                      src={product.productImage}
                      alt={product.productName}
                    />
                  </Link>

                  {/* Wishlist Heart Icon */}
                  <span
                    className="position-absolute top-0 end-0 m-2 p-2 rounded-circle"
                    style={{
                      backgroundColor: isInWishlist ? "#c0392b" : "#0d6efd",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleWishlist(product._id)}
                  >
                    <i className={`fa${isInWishlist ? "s" : "r"} fa-heart`}></i>
                  </span>

                  {/* Discount Badge */}
                  {product.discount > 0 && !isOutOfStock && (
                    <span className="badge bg-success position-absolute top-0 start-0 m-2">
                      -{product.discount}%
                    </span>
                  )}

                  {/* Out of Stock Badge */}
                  {isOutOfStock && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <Link to="/shop" className="text-muted small text-decoration-none mb-1">
                    {product.categoryId?.name || "Category"}
                  </Link>
                  <Link to={`/product/${product._id}`} className="text-dark fw-semibold mb-1 text-decoration-none">
                    <h6 className="mb-1">{product.productName}</h6>
                  </Link>

                  {/* Star Rating */}
                  <div className="mb-2 d-flex align-items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`fa fa-star ${product.averageRating > i ? "checked text-warning" : "text-secondary"}`}
                        style={{ fontSize: "0.9rem" }}
                      ></span>
                    ))}
                    <span className="small ps-2 text-muted">({product.totalReviews || 0})</span>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div className="fw-bold text-primary">₹{discountedPrice}</div>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleAddToCartClick(product._id)}
                      disabled={isOutOfStock || addingToCartId === product._id}
                    >
                      {addingToCartId === product._id ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4 d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductList;
