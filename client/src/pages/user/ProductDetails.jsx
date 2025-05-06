import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [review, setReview] = useState({ rating: "", review: "" });
    const [errors, setErrors] = useState({});
    const [hasPurchased, setHasPurchased] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    useEffect(() => {
        fetchProduct();
        fetchReviews();
        checkPurchaseAndReview();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/products/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error("Failed to fetch product", err);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/reviews?productId=${id}`);
            setReviews(res.data);
        } catch (err) {
            console.error("Failed to fetch reviews", err);
        }
    };

    const checkPurchaseAndReview = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const res = await axios.get(`http://localhost:8000/orders/hasPurchased/${user._id}/${id}`);
            setHasPurchased(res.data.hasPurchased);

            const reviewRes = await axios.get(`http://localhost:8000/reviews?productId=${id}&userId=${user._id}`);
            setHasReviewed(reviewRes.data.length > 0);
        } catch (err) {
            console.error("Error checking purchase/review", err);
        }
    };

    const finalPrice = product ? (product.salePrice - (product.salePrice * product.discount / 100)).toFixed(2) : "0.00";

    const validateInputs = () => {
        const newErrors = {};
        if (!quantity || quantity <= 0) newErrors.quantity = "Please select a valid quantity";
        if (review.rating && (review.rating < 1 || review.rating > 5)) newErrors.rating = "Rating must be 1-5";
        if (review.review && !review.review.trim()) newErrors.review = "Review cannot be empty";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCartSubmit = () => {
        if (validateInputs()) {
            alert("Product added to cart successfully!");
            setQuantity("");
            setErrors({});
        }
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!review.rating || !review.review) {
            setErrors({
                rating: review.rating ? "" : "Rating is required",
                review: review.review ? "" : "Review cannot be empty",
            });
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?._id;
            if (!userId) {
                alert("Login required");
                return;
            }

            await axios.post("http://localhost:8000/reviews", {
                productId: id,
                userId,
                rating: review.rating,
                review: review.review,
            });

            alert("Review submitted!");
            setReview({ rating: "", review: "" });
            fetchReviews();
        } catch (err) {
            alert("Failed to submit review");
        }
    };

    if (!product) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="container py-5">
            <p className="breadcrumb">
                <Link to="/" className="text-muted text-decoration-none">Home</Link> /
                <Link to="/shop" className="text-muted text-decoration-none mx-2">Shop</Link> /
                <span className="fw-bold">{product.productName}</span>
            </p>

            <div className="card shadow-lg p-4 border-0">
                <div className="row g-4">
                    <div className="col-md-5">
                        <img src={product.productImage} alt={product.productName} className="img-fluid rounded" />
                    </div>

                    <div className="col-md-7">
                        <h2 className="fw-bold">{product.productName}</h2>

                        <div className="d-flex align-items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`fa fa-star ${product.averageRating > i ? "text-warning" : "text-muted"}`}></span>
                            ))}
                            <span className="ms-2 text-muted">({product.totalReviews || 0} reviews)</span>
                        </div>

                        <p className="text-muted">{product.description}</p>

                        <div className="mb-3">
                             <span className="fs-5 fw-semibold text-success">₹{(product.costPrice || product.salePrice).toFixed(2)}</span>
                             {product.discount > 0 && product.salePrice && (
                            <span className="text-muted text-decoration-line-through ms-2">
                            ₹{product.salePrice.toFixed(2)}
                                </span>
                                )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Quantity</label>
                            <select
                                className="form-select"
                                value={quantity}
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                    setErrors(prev => ({ ...prev, quantity: "" }));
                                }}
                            >
                                <option value="">Select quantity</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            {errors.quantity && <p className="text-danger">{errors.quantity}</p>}
                        </div>

                        <button className="btn btn-primary w-100" onClick={handleCartSubmit}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="text-center fw-bold mb-4">Customer Reviews</h4>
                <div className="row">
                    <div className="col-md-6">
                        {hasPurchased ? (
                            hasReviewed ? (
                                <div className="alert alert-info">You have already reviewed this product.</div>
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
                                            {[1, 2, 3, 4, 5].map(r => (
                                                <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
                                            ))}
                                        </select>
                                        {errors.rating && <p className="text-danger">{errors.rating}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Your Review</label>
                                        <textarea
                                            name="review"
                                            className="form-control"
                                            rows="3"
                                            value={review.review}
                                            onChange={handleReviewChange}
                                            placeholder="Share your experience..."
                                        />
                                        {errors.review && <p className="text-danger">{errors.review}</p>}
                                    </div>

                                    <button type="submit" className="btn btn-outline-primary">Submit Review</button>
                                </form>
                            )
                        ) : (
                            <div className="alert alert-warning">
                                You need to purchase this product to leave a review.
                            </div>
                        )}
                    </div>

                    <div className="col-md-6">
                        {reviews.map((r) => (
                            <div key={r._id} className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h6 className="fw-bold mb-1">{r.userId?.firstName} {r.userId?.lastName}</h6>
                                    <div className="mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`fa fa-star ${r.rating > i ? "text-warning" : "text-muted"}`}></span>
                                        ))}
                                    </div>
                                    <p>{r.review}</p>
                                    <small className="text-muted">{new Date(r.createdAt).toLocaleDateString()}</small>
                                </div>
                                {r.reply && (
                                    <div className="card-footer bg-light">
                                        <strong>{r.replier || "Admin"}:</strong> {r.reply}<br />
                                        <small className="text-muted">{new Date(r.replyDate).toLocaleDateString()}</small>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
