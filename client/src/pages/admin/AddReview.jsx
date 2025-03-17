import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddReview = () => {
    const [formData, setFormData] = useState({
        productid: "",
        userid: "",
        rating: "",
        review: "",
    });

    const [errors, setErrors] = useState({});

    const products = [
        { id: "1", name: "Apple" },
        { id: "2", name: "Milk" },
        { id: "3", name: "Carrot" },
    ];

    const users = [
        { id: "101", name: "John Doe" },
        { id: "102", name: "Jane Smith" },
        { id: "103", name: "David Johnson" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;

        const displayName = name.replace(/([A-Z])/g, " $1").trim();
        const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

        if (!value || value.trim() === "") {
            return `${formattedName} is required.`;
        }

        if (name === "review") {
            if (value.length < 10) return `${formattedName} must be at least 10 characters long.`;
            if (value.length > 500) return `${formattedName} cannot exceed 500 characters.`;
        }

        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            newErrors[key] = validateField(key, formData[key]);
        });

        setErrors(newErrors);

        if (Object.values(newErrors).every((err) => !err)) {
            toast.success("Review submitted successfully!");
        }
    };

    return (
        <div>
            <h1 className="mt-4">Add Review</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/admin/reviews">Reviews</Link></li>
                <li className="breadcrumb-item active">Add Review</li>
            </ol>
            
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="productid" className="form-label">Product</label>
                            <select className="form-select" id="productid" name="productid" value={formData.productid} onChange={handleChange}>
                                <option value="" disabled>Select a product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.id} - {product.name}
                                    </option>
                                ))}
                            </select>
                            {errors.productid && <div id="productidError" className="error-message text-danger">{errors.productid}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="userid" className="form-label">User</label>
                            <select className="form-select" id="userid" name="userid" value={formData.userid} onChange={handleChange}>
                                <option value="" disabled>Select a user</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.id} - {user.name}
                                    </option>
                                ))}
                            </select>
                            {errors.userid && <div id="useridError" className="error-message text-danger">{errors.userid}</div>}
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
                            {errors.rating && <div id="ratingError" className="error-message text-danger">{errors.rating}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="review" className="form-label">Review</label>
                            <textarea className="form-control" id="review" name="review" rows="3" value={formData.review} onChange={handleChange} placeholder="Enter review"></textarea>
                            {errors.review && <div id="reviewError" className="error-message text-danger">{errors.review}</div>}
                        </div>

                        <input type="submit" className="btn btn-primary" value="Submit Review" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
