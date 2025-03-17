import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
    const [formData, setFormData] = useState({
        productName: "Sample Product",
        productDiscount: "10",
        costPrice: "100",
        salePrice: "120",
        productStock: "50",
        productCategory: "1",
        productDescription: "Sample description",
        productImage: null,
    });
    const [errors, setErrors] = useState({});

    const categories = [
        { id: "1", name: "Fruits" },
        { id: "2", name: "Vegetables" },
        { id: "3", name: "Dairy" },
        { id: "-", name: "None" },
    ];

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue = type === "file" ? files[0] : value;
        setFormData({ ...formData, [name]: newValue });

        const error = validateField(name, newValue);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;
        const displayName = name.replace(/([A-Z])/g, ' $1').trim();
        const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    
        if (!value && (typeof value === "string" && value.trim() === "")) {
            return `${formattedName} is required.`;
        }
    
        if (name === "productName") {
            if (/^\d+$/.test(value)) {
                return "Product name cannot be a number.";
            }
            if (value.length < 3) {
                return "Product name must be at least 3 characters long.";
            }
        }

        if (["productDiscount", "costPrice", "salePrice", "productStock"].includes(name)) {
            if (isNaN(value) || value < 0) {
                return `${name.replace(/([A-Z])/g, ' $1')} must be a valid non-negative number.`;
            }
        }

        if (name === "productDiscount") {
            if (value < 1 || value > 100) {
                return "Discount must be between 1% and 100%.";
            }
        }

        if (name === "salePrice" && formData.costPrice) {
            if (parseFloat(value) < parseFloat(formData.costPrice)) {
                return "Sale price cannot be less than cost price.";
            }
        }

        if (name === "productStock" && !Number.isInteger(Number(value))) {
            return "Stock quantity must be a whole number.";
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (name === "productImage" && value && !allowedTypes.includes(value.type)) {
            return "Only JPG, PNG, and GIF formats are allowed.";

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
        toast.success("Product updated successfully!");
    };

    return (
        <div>
            <h1 className="mt-4">Update Product</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/admin/products">Products</Link></li>
                <li className="breadcrumb-item active">Update Product</li>
            </ol>

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Product Name</label>
                                <input type="text" className="form-control" name="productName" value={formData.productName} onChange={handleChange} />
                                {errors.productName && <small className="text-danger">{errors.productName}</small>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Discount (%)</label>
                                <input type="number" className="form-control" name="productDiscount" value={formData.productDiscount} onChange={handleChange} />
                                {errors.productDiscount && <small className="text-danger">{errors.productDiscount}</small>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Cost Price</label>
                                <input type="number" className="form-control" name="costPrice" value={formData.costPrice} onChange={handleChange} />
                                {errors.costPrice && <small className="text-danger">{errors.costPrice}</small>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Sale Price</label>
                                <input type="number" className="form-control" name="salePrice" value={formData.salePrice} onChange={handleChange} />
                                {errors.salePrice && <small className="text-danger">{errors.salePrice}</small>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Stock Quantity</label>
                                <input type="number" className="form-control" name="productStock" value={formData.productStock} onChange={handleChange} />
                                {errors.productStock && <small className="text-danger">{errors.productStock}</small>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-select" name="productCategory" value={formData.productCategory} onChange={handleChange}>
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.productCategory && <small className="text-danger">{errors.productCategory}</small>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" name="productDescription" value={formData.productDescription} onChange={handleChange} rows="4"></textarea>
                            {errors.productDescription && <small className="text-danger">{errors.productDescription}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Product Image</label>
                            <input type="file" className="form-control" name="productImage" onChange={handleChange} />
                            {errors.productImage && <div className="text-danger">{errors.productImage}</div>}
                            <img src="/img/items/products/66ee9001ceeaeapple.webp" alt="Product" height="150px" className="mt-2" />
                        </div>


                        <button type="submit" className="btn btn-primary">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
