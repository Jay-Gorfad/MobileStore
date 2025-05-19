// src/pages/user/ProductDetails.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { updateCartCount } = useAuth();          // badge updater

  /* ------------------------------------------------------------------ */
  /*  Local state                                                       */
  /* ------------------------------------------------------------------ */
  const [product, setProduct]       = useState(null);
  const [reviews, setReviews]       = useState([]);
  const [quantity, setQuantity]     = useState("");
  const [review, setReview]         = useState({ rating: "", review: "" });
  const [errors, setErrors]         = useState({});
  const [purchased, setPurchased]   = useState(false);
  const [reviewed, setReviewed]     = useState(false);
  const [adding, setAdding]         = useState(false);

  const user   = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  /* ------------------------------------------------------------------ */
  /*  Fetch product, reviews, purchase status                            */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const prodRes = await axios.get(`http://localhost:8000/products/${id}`);
        setProduct(prodRes.data);

        const revRes  = await axios.get(`http://localhost:8000/reviews?productId=${id}`);
        setReviews(revRes.data);

        if (userId) {
          const purRes = await axios.get(
            `http://localhost:8000/orders/has-purchased/${userId}/${id}`
          );
          setPurchased(purRes.data.purchased ?? purRes.data.hasPurchased);

          const ownRes = await axios.get(
            `http://localhost:8000/reviews?productId=${id}&userId=${userId}`
          );
          setReviewed(ownRes.data.length > 0);
        }
      } catch (err) {
        console.error("Error loading product data", err);
        toast.error("Failed to load product details.");
      }
    };
    fetchAll();
  }, [id, userId]);

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                           */
  /* ------------------------------------------------------------------ */
  const num = (n) => parseFloat(n) || 0;
  const discounted = product
    ? num(product.salePrice) - (num(product.salePrice) * product.discount) / 100
    : 0;

  const validate = () => {
    const errs = {};
    if (!quantity) errs.quantity = "Please select a quantity";
    if (review.rating && (review.rating < 1 || review.rating > 5))
      errs.rating = "Rating must be 1‑5";
    if (review.review && !review.review.trim())
      errs.review = "Review cannot be empty";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ------------------------------------------------------------------ */
  /*  Add to cart                                                       */
  /* ------------------------------------------------------------------ */
  const addToCart = async () => {
    if (!validate()) return;

    if (!userId) {
      toast.error("Please log in to add to cart.");
      return;
    }

    setAdding(true);
    try {
      const { data } = await axios.post("http://localhost:8000/cart", {
        userId,
        productId: id,
        quantity: Number(quantity),
      });
      updateCartCount(data.items.length);
      toast.success("Product added to cart!");
      setQuantity("");
    } catch {
      toast.error("Failed to add product.");
    } finally {
      setAdding(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Review form                                                       */
  /* ------------------------------------------------------------------ */
  const handleReviewChange = ({ target: { name, value } }) =>
    setReview((r) => ({ ...r, [name]: value }));

  const submitReview = async (e) => {
    e.preventDefault();
    if (!review.rating || !review.review) {
      setErrors({
        rating: review.rating ? "" : "Rating is required",
        review: review.review ? "" : "Review cannot be empty",
      });
      return;
    }
    if (!userId) {
      toast.error("Login required");
      return;
    }
    try {
      await axios.post("http://localhost:8000/reviews", {
        productId: id,
        userId,
        rating: review.rating,
        review: review.review,
      });
      toast.success("Review submitted!");
      setReview({ rating: "", review: "" });
      setReviewed(true);
      const { data } = await axios.get(`http://localhost:8000/reviews?productId=${id}`);
      setReviews(data);
    } catch {
      toast.error("Failed to submit review");
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  if (!product) return <div className="text-center py-5">Loading…</div>;

  return (
    <div className="container py-5">
      {/* breadcrumb */}
      <p className="breadcrumb">
        <Link to="/"   className="text-muted text-decoration-none">Home</Link> /
        <Link to="/shop" className="text-muted text-decoration-none mx-2">Shop</Link> /
        <span className="fw-bold">{product.productName}</span>
      </p>

      {/* product card */}
      <div className="card shadow-lg p-4 border-0">
        <div className="row g-4">

          {/* image */}
          <div className="col-md-5">
            <img src={product.productImage} alt={product.productName}
                 className="img-fluid rounded" />
          </div>

          {/* info */}
          <div className="col-md-7">
            <h2 className="fw-bold">{product.productName}</h2>

            {/* rating badge */}
            <div className="d-flex align-items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}
                      className={`fa fa-star ${product.averageRating > i ? "text-warning" : "text-muted"}`} />
              ))}
              <span className="ms-2 text-muted">
                ({product.totalReviews || 0} reviews)
              </span>
            </div>

            <p className="text-muted">{product.description}</p>

            {/* price display */}
            <div className="mb-3">
              <span className="fs-5 fw-semibold text-success">
                ₹{discounted.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-muted text-decoration-line-through ms-2">
                  ₹{num(product.salePrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* quantity select */}
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <select
                className="form-select"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setErrors((e) => ({ ...e, quantity: "" }));
                }}
              >
                <option value="">Select quantity</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
              {errors.quantity && (
                <p className="text-danger">{errors.quantity}</p>
              )}
            </div>

            <button className="btn btn-primary w-100"
                    onClick={addToCart}
                    disabled={adding}>
              {adding ? "Adding…" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* reviews ------------------------------------------------------ */}
      <div className="mt-5">
        <h4 className="text-center fw-bold mb-4">Customer Reviews</h4>
        <div className="row">
          {/* review form */}
          <div className="col-md-6">
            {purchased ? (
              reviewed ? (
                <div className="alert alert-info">
                  You have already reviewed this product.
                </div>
              ) : (
                <form onSubmit={submitReview} className="card p-4 shadow-sm">
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select
                      name="rating"
                      className="form-select"
                      value={review.rating}
                      onChange={handleReviewChange}
                    >
                      <option value="">Select rating</option>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r} Star{r > 1 && "s"}</option>
                      ))}
                    </select>
                    {errors.rating && (
                      <p className="text-danger">{errors.rating}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Review</label>
                    <textarea
                      name="review"
                      className="form-control"
                      rows="3"
                      value={review.review}
                      onChange={handleReviewChange}
                      placeholder="Share your experience…"
                    />
                    {errors.review && (
                      <p className="text-danger">{errors.review}</p>
                    )}
                  </div>

                  <button type="submit" className="btn btn-outline-primary">
                    Submit Review
                  </button>
                </form>
              )
            ) : (
              <div className="alert alert-warning">
                You need to purchase this product to leave a review.
              </div>
            )}
          </div>

          {/* review list */}
          <div className="col-md-6">
            {reviews.map((r) => (
              <div key={r._id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold mb-1">
                    {r.userId?.firstName} {r.userId?.lastName}
                  </h6>
                  <div className="mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}
                            className={`fa fa-star ${r.rating > i ? "text-warning" : "text-muted"}`} />
                    ))}
                  </div>
                  <p>{r.review}</p>
                  <small className="text-muted">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </small>
                </div>
                {r.reply && (
                  <div className="card-footer bg-light">
                    <strong>{r.replier || "Admin"}:</strong> {r.reply}
                    <br />
                    <small className="text-muted">
                      {new Date(r.replyDate).toLocaleDateString()}
                    </small>
                  </div>
                )}
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-center text-muted">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
