import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const product = {
        id: 1,
        name: "IPhone 15 Pro Max",
        image: "67409349bfcac_71yzJoE7WlL._SX679_.jpg",
        description: "The 6.7” Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance. ",
        salePrice: 500,
        discount: 10, // 10% discount
        rating: 4.5,
        reviewCount: 8,
        specifications: [
            { label: "Display", value: "6.7” AMOLED Display" },
            { label: "Processor", value: "A17 PRO CHIP" },
            { label: "RAM", value: "8 GB" },
            { label: "Storage", value: "256 GB" },
            { label: "Rear Camera", value: "48MP" },
            { label: "Front Camera", value: "24MP" },
            { label: "Battery", value: "5000mah" },
            { label: "Operating System", value: "IOS" },
            { label: "Color", value: "Space Black" }
        ]
    };
    
    const reviews = [
        {
            id: 1,
            user: "John Doe",
            rating: 5,
            review: "Excellent Mobile",
            date: "March 10, 2025",
            reply: "Thank you for your feedback.",
            replier: "Seller",
            replyDate: "March 10, 2025",
        },
        {
            id: 2,
            user: "Jane Doe", 
            rating: 4,
            review: "Good Processor.",
            date: "March 11, 2025",
            reply: "We appreciate your review.",
            replier: "Seller",
            replyDate: "March 11, 2025",
        },
        {
            id: 3,
            user: "Michael Smith",
            rating: 5,
            review: "Good Camera",
            date: "March 12, 2025",
            reply: "Thank you.",
            replier: "Seller",
            replyDate: "March 12, 2025",
        },
    ];
    
    
    const finalPrice = (139000).toFixed(2);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [review, setReview] = useState({ rating: "", review: "" });
    const [errors, setErrors] = useState({});
    
    const handleQuantityChange = (action) => {
        if (action === 'increment' && selectedQuantity < 5) {
            setSelectedQuantity(prev => prev + 1);
            setErrors(prevErrors => ({ ...prevErrors, quantity: "" }));
        } else if (action === 'decrement' && selectedQuantity > 1) {
            setSelectedQuantity(prev => prev - 1);
            setErrors(prevErrors => ({ ...prevErrors, quantity: "" }));
        } else if (action === 'input') {
            setErrors(prevErrors => ({ ...prevErrors, quantity: "" }));
        }
    };

    const handleInputQuantity = (e) => {
        const value = parseInt(e.target.value) || "";
        if (value === "" || (value >= 1 && value <= 5)) {
            setSelectedQuantity(value);
            setErrors(prevErrors => ({ ...prevErrors, quantity: "" }));
        }
    };
    
    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    
        // Validate and update errors for the changed field
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };
    
    const validateField = (name, value) => {
        let error = null;
        
        if (name === "rating") {
            if (!value) error = "Rating is required";
        } else if (name === "review") {
            if (!value.trim()) error = "Review cannot be empty";
        } else if (name === "quantity") {
            if (!value) error = "Please select a quantity";
        }
    
        return error;
    };
    
    const validateReview = () => {
        let errors = {};
    
        errors.rating = validateField("rating", review.rating);
        errors.review = validateField("review", review.review);
    
        // Remove null errors
        Object.keys(errors).forEach((key) => {
            if (!errors[key]) delete errors[key];
        });
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const submitReview = (e) => {
        e.preventDefault();
        if (validateReview()) {
            alert("Review submitted successfully!");
            // toast.success("Review submitted successfully!");
            setReview({ rating: "", review: "" });
            setErrors({});
        }
    };
    
    const validateQuantity = () => {
        let errors = {};
        if(!selectedQuantity) errors.quantity = "Please select a quantity";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleCartSubmit = ()=>{
        if (validateQuantity()) {
            alert("Product added to cart successfully!");
            // toast.success("Product added to cart successfully!");
            setSelectedQuantity(1);
            setErrors({});
        }
    }
    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/shop" className="text-decoration-none text-muted">Shop</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                </ol>
            </nav>

            <div className="card border-0 shadow-sm mb-5">
                <div className="row g-0">
                    <div className="col-md-5">
                        <div className="p-4">
                            <img 
                                src={`/img/items/products/${product.image}`} 
                                alt={product.name}
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="p-4 p-md-5">
                            <h2 className="mb-3">{product.name}</h2>
                            <div className="d-flex align-items-center mb-3">
                                <div className="ratings me-2">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`fa fa-star ${product.rating > i ? "text-warning" : "text-muted"}`}></span>
                                    ))}
                                </div>
                                <span className="text-muted">({product.reviewCount} reviews)</span>
                            </div>
                            <p className="text-muted mb-4">{product.description}</p>
                            <div className="mb-4">
                                <h4 className="text-primary mb-0">₹{finalPrice}</h4>
                                {product.discount > 0 && (
                                    <small className="text-success">
                                        {product.discount}% OFF
                                    </small>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Quantity</label>
                                <div className="input-group" style={{ width: "140px" }}>
                                    <button 
                                        className="btn btn-outline-secondary" 
                                        type="button"
                                        onClick={() => handleQuantityChange('decrement')}
                                    >
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    <input 
                                        type="number" 
                                        className="form-control text-center"
                                        value={selectedQuantity}
                                        onChange={handleInputQuantity}
                                        min="1"
                                        max="5"
                                    />
                                    <button 
                                        className="btn btn-outline-secondary" 
                                        type="button"
                                        onClick={() => handleQuantityChange('increment')}
                                    >
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                                {errors.quantity && (
                                    <div className="text-danger mt-1 small">{errors.quantity}</div>
                                )}
                            </div>
                            <button 
                                onClick={handleCartSubmit} 
                                className="btn btn-primary btn-lg w-100"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-5">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">Product Specifications</h4>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <tbody>
                                        {product.specifications.map((spec, index) => (
                                            <tr key={index}>
                                                <th className="bg-light text-secondary" style={{width: "30%"}}>{spec.label}</th>
                                                <td>{spec.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">Customer Reviews</h4>
                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="card border">
                                <div className="card-body">
                                    <h5 className="card-title mb-4">Write a Review</h5>
                                    <form onSubmit={submitReview}>
                                        <div className="mb-3">
                                            <label className="form-label">Rating</label>
                                            <select 
                                                name="rating" 
                                                className="form-select"
                                                onChange={handleReviewChange}
                                                value={review.rating}
                                            >
                                                <option value="">Select rating</option>
                                                {[1, 2, 3, 4, 5].map(r => (
                                                    <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                                                ))}
                                            </select>
                                            {errors.rating && (
                                                <div className="text-danger small mt-1">{errors.rating}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Review</label>
                                            <textarea 
                                                name="review"
                                                className="form-control"
                                                rows="3"
                                                placeholder="Share your experience with this product"
                                                onChange={handleReviewChange}
                                                value={review.review}
                                            ></textarea>
                                            {errors.review && (
                                                <div className="text-danger small mt-1">{errors.review}</div>
                                            )}
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Submit Review
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row g-3">
                                {reviews.map(r => (
                                    <div key={r.id} className="col-12">
                                        <div className="card border h-100">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h6 className="card-subtitle mb-0">{r.user}</h6>
                                                    <small className="text-muted">{r.date}</small>
                                                </div>
                                                <div className="mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`fa fa-star ${r.rating > i ? "text-warning" : "text-muted"}`}></span>
                                                    ))}
                                                </div>
                                                <p className="card-text">{r.review}</p>
                                                {r.reply && (
                                                    <div className="border-start border-3 ps-3 mt-3">
                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                            <h6 className="card-subtitle mb-0 text-primary">{r.replier}</h6>
                                                            <small className="text-muted">{r.replyDate}</small>
                                                        </div>
                                                        <p className="card-text mb-0">{r.reply}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;