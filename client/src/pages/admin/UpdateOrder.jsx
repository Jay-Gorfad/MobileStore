import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddOrder = () => {
    const [formData, setFormData] = useState({
        userId: "",
        orderDate: "2025-03-15",
        products: [
            { productId: "", quantity: "" }
        ],
        firstName: "John",
        lastName: "Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        pinCode: "10001",
        phone: "9876543210",
        shippingCharge: "50",
        status: "Pending",
    });

    
    const [errors, setErrors] = useState({
        userId: "",
        orderDate: "",
        products: [], // Array to store errors for each product
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        phone: "",
        shippingCharge: "",
        status: "",
    });

    // Static data for users and products
    const users = [
        { id: "1", name: "User 1" },
        { id: "2", name: "User 2" },
    ];

    const products = [
        { id: "101", name: "Product 1" },
        { id: "102", name: "Product 2" },
    ];

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const newProducts = [...formData.products];
        newProducts[index][name] = value;
        setFormData({ ...formData, products: newProducts });

        // Validate the changed field
        const errorMessage = validateField(name, value);
        const newErrors = { ...errors };
        if (!newErrors.products[index]) {
            newErrors.products[index] = {};
        }
        newErrors.products[index][name] = errorMessage || undefined;
        setErrors(newErrors);
    };

    const addProduct = () => {
        setFormData({
            ...formData,
            products: [...formData.products, { productId: "", quantity: 1 }],
        });
        setErrors({
            ...errors,
            products: [...errors.products, {}], // Add an empty error object for the new product
        });
    };

    const removeProduct = (index) => {
        const newProducts = formData.products.filter((_, i) => i !== index);
        
        setFormData({ ...formData, products: newProducts });
    
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            newErrors.products = prevErrors.products.filter((_, i) => i !== index);
            return newErrors;
        });
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const errorMessage = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage || undefined,
        }));
    };

    const validateField = (name, value) => {
        if (!value || (typeof value === "string" && !value.trim())) {
            const fieldNames = {
                userId: "User ID",
                orderDate: "Order Date",
                firstName: "First Name",
                lastName: "Last Name",
                address: "Address",
                city: "City",
                state: "State",
                pinCode: "Pin Code",
                phone: "Phone Number",
                shippingCharge: "Shipping Charge",
                status: "Order Status",
                productId: "Product ID",
                quantity: "Quantity",
            };
            return `${fieldNames[name] || "This field"} is required.`;
        }
    
        if (name === "quantity" && (isNaN(value) || value <= 0)) {
            return "Quantity must be greater than 0.";
        }
    
        return undefined; // Instead of empty string
    };
    
    const validateForm = () => {
        const newErrors = { userId: "", orderDate: "", products: [], firstName: "", lastName: "", address: "", city: "", state: "", pinCode: "", phone: "", shippingCharge: "", status: "" };


        // Validate user and order details
        if (!formData.userId) newErrors.userId = "Please select a user.";
        if (!formData.orderDate) newErrors.orderDate = "Please enter an order date.";

        // Validate each product
        formData.products.forEach((product, index) => {
            newErrors.products[index] = {};
            if (!product.productId) {
                newErrors.products[index].productId = "Product ID is required.";
            }
            if (!product.quantity || product.quantity <= 0) {
                newErrors.products[index].quantity = "Quantity must be greater than 0.";
            }
        });

        // Validate shipping details
        const requiredFields = ["firstName", "lastName", "address", "city", "state", "pinCode", "phone", "shippingCharge"];
        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = `${field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())} is required.`;
            }
        });

        setErrors(newErrors);
        

        // Check if there are any errors
        const hasErrors = 
        Object.entries(newErrors)
            .some(([key, value]) => key !== "products" && value) || 
        newErrors.products.some(productErrors => Object.values(productErrors).some(error => error));
    
        return !hasErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success("Order updated successfully");
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <div>
                    <h1>Update Order</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/orders">Orders</Link></li>
                        <li className="breadcrumb-item active">Update Order</li>
                    </ol>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    {/* User ID and Order Date */}
                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label">User ID</label>
                        <select className="form-select" id="userId" name="userId" value={formData.userId} onChange={handleChange}>
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                        {errors.userId && <div className="error-message">{errors.userId}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="orderDate" className="form-label">Order Date</label>
                        <input type="date" className="form-control" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} />
                        {errors.orderDate && <div className="error-message">{errors.orderDate}</div>}
                    </div>

                    {/* Products Section */}
                    <div id="productContainer">
                        {formData.products.map((product, index) => (
                            <div className="product-entry mb-3" key={index}>
                                <h5>Product {index + 1}</h5>
                                <div className="row align-items-end">
                                    <div className="col-md-5">
                                        <label htmlFor={`productId${index}`} className="form-label">Product ID</label>
                                        <select
                                            className={`form-select`}
                                            id={`productId${index}`}
                                            name="productId"
                                            value={product.productId}
                                            onChange={(e) => handleProductChange(index, e)}
                                        >
                                            <option value="">Select Product</option>
                                            {products.map(prod => (
                                                <option key={prod.id} value={prod.id}>{prod.name}</option>
                                            ))}
                                        </select>
                                        {errors.products[index]?.productId && (
                                            <div className="error-message">{errors.products[index].productId}</div>
                                        )}
                                    </div>

                                    <div className="col-md-5">
                                        <label htmlFor={`quantity${index}`} className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            className={`form-control`}
                                            id={`quantity${index}`}
                                            name="quantity"
                                            min="1"
                                            value={product.quantity}
                                            onChange={(e) => handleProductChange(index, e)}
                                        />
                                        {errors.products[index]?.quantity && (
                                            <div className="error-message">{errors.products[index].quantity}</div>
                                        )}
                                    </div>

                                    <div className="col-md-2">
                                        <button type="button" className="btn btn-danger mt-2 deleteProductBtn" onClick={() => removeProduct(index)}>Delete Product</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="button" className="btn btn-secondary" onClick={addProduct}>Add Another Product</button>

                    {/* Shipping Details Section */}
                    <div id="shippingDetailsSection" className="mb-4">
                        <h2 className="mt-3">Shipping Details</h2>
                        <div className="row g-5">
                        <div className="col-md-12">
                                <div className="row gx-2 gy-3">
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="shippingFirstName" className="form-label d-block">First Name<span className="required">*</span></label>
                                        <input type="text" id="shippingFirstName" name="firstName" className="form-control" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="shippingLastName" className="form-label d-block">Last Name<span className="required">*</span></label>
                                        <input type="text" id="shippingLastName" name="lastName" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                                    </div>
                                    <div className="col-12 col-sm-12">
                                        <label htmlFor="shippingAddress" className="form-label d-block">Street Address<span className="required">*</span></label>
                                        <textarea id="shippingAddress" name="address" className="form-control" rows="2" placeholder="Street Address" value={formData.address} onChange={handleChange}></textarea>
                                        {errors.address && <p className="error-message">{errors.address}</p>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="shippingCity" className="form-label d-block">City<span className="required">*</span></label>
                                        <input type="text" id="shippingCity" name="city" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} />
                                        {errors.city && <p className="error-message">{errors.city}</p>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="shippingState" className="form-label d-block">State<span className="required">*</span></label>
                                        <input type="text" id="shippingState" name="state" className="form-control" placeholder="State" value={formData.state} onChange={handleChange} />
                                        {errors.state && <p className="error-message">{errors.state}</p>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="shippingPinCode" className="form-label d-block">Pin Code<span className="required">*</span></label>
                                        <input type="text" id="shippingPinCode" name="pinCode" className="form-control" placeholder="Pin Code" value={formData.pinCode} onChange={handleChange} />
                                        {errors.pinCode && <p className="error-message">{errors.pinCode}</p>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="shippingPhone" className="form-label d-block">Phone<span className="required">*</span></label>
                                        <input type="text" id="shippingPhone" name="phone" className="form-control" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                                        {errors.phone && <p className="error-message">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 mt-4">
                        <label htmlFor="shippingCharge" className="form-label">Shipping Charge</label>
                        <input type="number" step="0.01" id="shippingCharge" name="shippingCharge" className="form-control" placeholder="Enter shipping charge" value={formData.shippingCharge} onChange={handleChange} />
                        {errors.shippingCharge && <div className="error-message">{errors.shippingCharge}</div>}
                    </div>

                    <div className="mb-3 mt-4">
                        <label htmlFor="orderStatus" className="form-label">Order Status</label>
                        <select className="form-select" id="orderStatus" name="status" value={formData.status} onChange={handleChange}>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        {errors.status && <div className="error-message">{errors.status}</div>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary" name="add-order">Update Order</button>
                </form>
            </div>
        </div>
    );
};

export default AddOrder;