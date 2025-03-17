import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateReview = () => {
    const [formData, setFormData] = useState({
        productid: "Apple",
        rname: "John Doe",
        rating: "5",
        review: "Great product! Highly recommended."
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Validate field
        const error = validateField(name, value);
        setErrors((prevErrors) => ({...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        if (name === "review") {
            if (!value || value.trim() === "") return "Review is required.";
            if (value.length < 10) return "Review must be at least 10 characters long.";
            if (value.length > 500) return "Review cannot exceed 500 characters.";
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        newErrors.review = validateField("review", formData.review);
        newErrors.rating = formData.rating ? null : "Rating is required.";
        setErrors(newErrors);
        if (!newErrors.review && !newErrors.rating) {
            toast.success("Review updated successfully!");
        }
    };

    return (
        <div>
        <h1 className="mt-4">Update Review</h1>
            <ol className="breadcrumb mb-4">
				<li className="breadcrumb-item">
					<Link to="/admin">Dashboard</Link>
				</li>
                <li className="breadcrumb-item">
					<Link to="/admin/reviews">Reviews</Link>
				</li>
				<li className="breadcrumb-item active">Update Review</li>
			</ol>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Product</label>
                            <input type="text" className="form-control" value={formData.productid} disabled />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">User</label>
                            <input type="text" className="form-control" value={formData.rname} disabled />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="rating" className="form-label">Rating</label>
                            <select className="form-select" id="rating" name="rating" value={formData.rating} onChange={handleChange}>
                                <option value="" disabled>Select a rating</option>
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                            {errors.rating && <div className="text-danger">{errors.rating}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="review" className="form-label">Review</label>
                            <textarea className="form-control" id="review" name="review" rows="3" value={formData.review} onChange={handleChange} placeholder="Enter review"></textarea>
                            {errors.review && <div className="text-danger">{errors.review}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary">Update Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateReview;
