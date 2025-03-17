import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddToCart = () => {
    const [formData, setFormData] = useState({
        productId: "",
        quantity: "",
    });

    const [errors, setErrors] = useState({});

    // Static grocery products
    const products = [
        { productId: 1, productName: "Apples" },
        { productId: 2, productName: "Bananas" },
        { productId: 3, productName: "Carrots" },
        { productId: 4, productName: "Tomatoes" },
        { productId: 5, productName: "Milk" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate field
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;

        if (name === "productId" && !value) {
            error = "Please select a product.";
        }

        if (name === "quantity") {
            if (!value || value <= 0) {
                error = "Quantity must be at least 1.";
            }
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

        if (Object.values(formErrors).some((error) => error)) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        toast.success("Product added to cart successfully!");
    };

    return (
        <div className="container mt-4">
            <h1>Add Product to Cart</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to="/admin/users">Users</Link></li>
                    <li className="breadcrumb-item"><Link to="/admin/cart">Cart</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Product to Cart</li>
                </ol>
            </nav>
            <h5>User: John Doe</h5>

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="productId" className="form-label">Product</label>
                                    <select
                                        className="form-select"
                                        id="productId"
                                        name="productId"
                                        value={formData.productId}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select a product</option>
                                        {products.map((product) => (
                                            <option key={product.productId} value={product.productId}>
                                                {product.productId} - {product.productName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.productId && <p className="text-danger">{errors.productId}</p>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                    {errors.quantity && <p className="text-danger">{errors.quantity}</p>}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Add to Cart</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;
