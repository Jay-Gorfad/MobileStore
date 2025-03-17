import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateOffer = () => {
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        offerDescription: "Limited Time Discount!",
        offerCode: "SAVE20",
        discount: "20",
        maxDiscount: "500",
        minOrder: "1000",
        startDate: "2025-03-01",
        endDate: "2025-03-31",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;

        if (name === "offerDescription") {
            if (!value.trim()) {
                error = "Offer description is required.";
            } else if (value.length < 5) {
                error = "Offer description must be at least 5 characters.";
            }
        }

        if (name === "offerCode" && (!/^[A-Z0-9]+$/.test(value) || value.length < 3 || value.length > 10)) {
            error = "Offer code must be 3-10 uppercase letters or numbers.";
        }

        if (name === "discount" && (!/^[0-9]+$/.test(value) || value < 1 || value > 100)) {
            error = "Discount must be between 1% and 100%.";
        }

        if ((name === "maxDiscount" || name === "minOrder") && (!/^[0-9]+$/.test(value) || value <= 0)) {
            error = `${name === "maxDiscount" ? "Maximum discount" : "Minimum order"} must be greater than 0.`;
        }

        if (name === "endDate" && formData.startDate && new Date(value) <= new Date(formData.startDate)) {
            error = "End date must be after start date.";
        }

        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        toast.success("Offer updated successfully!");
    };

    return (
        <div>
            <h1 className="mt-4">Update Offer</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/admin/offers">Offers</Link></li>
                <li className="breadcrumb-item active">Update Offer</li>
            </ol>

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Offer Description</label>
                            <input type="text" className="form-control" name="offerDescription" value={formData.offerDescription} onChange={handleChange} />
                            {errors.offerDescription && <p className="text-danger">{errors.offerDescription}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Offer Code</label>
                            <input type="text" className="form-control" name="offerCode" value={formData.offerCode} onChange={handleChange} />
                            {errors.offerCode && <p className="text-danger">{errors.offerCode}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Discount (%)</label>
                            <input type="text" className="form-control" name="discount" value={formData.discount} onChange={handleChange} />
                            {errors.discount && <p className="text-danger">{errors.discount}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Maximum Discount Amount</label>
                            <input type="text" className="form-control" name="maxDiscount" value={formData.maxDiscount} onChange={handleChange} />
                            {errors.maxDiscount && <p className="text-danger">{errors.maxDiscount}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Minimum Order Amount</label>
                            <input type="text" className="form-control" name="minOrder" value={formData.minOrder} onChange={handleChange} />
                            {errors.minOrder && <p className="text-danger">{errors.minOrder}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} />
                            {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">End Date</label>
                            <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} />
                            {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary">Update Offer</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateOffer;