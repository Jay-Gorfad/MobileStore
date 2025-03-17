import React from "react";
import { Link } from "react-router-dom";

const OrderDetails = ({ order = {
    orderId: "123456", 
    status: "Processing",
    placedOn: "01/03/2025",
    total: 1500,
    shippingCharge: 50,
    firstName: "John",
    lastName: "Doe", 
    mobileNo: "9876543210",
    email: "johndoe@example.com",
    paymentMode: "Credit Card",
    estimatedDelivery: "03/03/2025"
}, billingAddress={
    fullName: "John Doe",
    address: "123 Baker Street",
    city: "New York", 
    state: "NY",
    pincode: "10001",
    phone: "9876543210"
}, products=[
    {
        productId: 1,
        productName: "Apple 1 KG",
        productImage: "img/items/products/66ee9001ceeaeapple.webp",
        quantity: 2,
        price: 500,
        status: "Shipped"
    },
    {
        productId: 2,
        productName: "Cookie Cake",
        productImage: "img/items/products/cookiecake.webp",
        quantity: 1,
        price: 500,
        status: "Processing"
    }
] }) => {
    const handleReorder = () => {
        alert("Re-order placed successfully!");
    };

    const getStatusColor = (status) => {
        const colors = {
            'Processing': 'warning',
            'Shipped': 'info',
            'Delivered': 'success',
            'Cancelled': 'danger',
            'Pending': 'secondary'
        };
        return colors[status] || 'primary';
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-decoration-none">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/order-history" className="text-decoration-none">Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            #{order.orderId}
                        </li>
                    </ol>
                </nav>
                <button className="btn btn-outline-primary" onClick={handleReorder}>
                    <i className="bi bi-arrow-repeat me-2"></i>Re-order
                </button>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                    <div className="row align-items-center">
                        <div className="col">
                            <h4 className="mb-0">Order #{order.orderId}</h4>
                        </div>
                        <div className="col-auto">
                            <span className={`badge bg-${getStatusColor(order.status)} rounded-pill px-3`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-md-3">
                            <div className="border-end pe-3">
                                <small className="text-muted d-block">Order Date</small>
                                <strong>{order.placedOn}</strong>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="border-end pe-3">
                                <small className="text-muted d-block">Expected Delivery</small>
                                <strong>{order.estimatedDelivery}</strong>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="border-end pe-3">
                                <small className="text-muted d-block">Payment Method</small>
                                <strong>{order.paymentMode}</strong>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small className="text-muted d-block">Total Amount</small>
                            <strong>₹{order.total.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Items</h5>
                            {products.map((product, index) => (
                                <div key={index} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                    <img src={product.productImage} alt={product.productName} 
                                        className="rounded" style={{width: "80px", height: "80px", objectFit: "cover"}} />
                                    <div className="ms-3 flex-grow-1">
                                        <h6 className="mb-1">{product.productName}</h6>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="text-muted">
                                                Qty: {product.quantity} × ₹{product.price.toFixed(2)}
                                            </div>
                                            <span className={`badge bg-${getStatusColor(product.status)}-subtle text-${getStatusColor(product.status)}`}>
                                                {product.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ms-3 text-end">
                                        <div className="fw-bold">₹{(product.price * product.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                            <div className="border-top pt-3">
                                <div className="row justify-content-end">
                                    <div className="col-md-5">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal</span>
                                            <span>₹{(order.total - order.shippingCharge).toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Shipping</span>
                                            <span>₹{order.shippingCharge.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between fw-bold">
                                            <span>Total</span>
                                            <span>₹{order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Customer Details</h5>
                            <p className="mb-1"><strong>{order.firstName} {order.lastName}</strong></p>
                            <p className="mb-1"><i className="bi bi-telephone me-2"></i>+91 {order.mobileNo}</p>
                            <p className="mb-0"><i className="bi bi-envelope me-2"></i>{order.email}</p>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Delivery Address</h5>
                            <address className="mb-0">
                                <strong>{billingAddress.fullName}</strong><br/>
                                {billingAddress.address}<br/>
                                {billingAddress.city}, {billingAddress.state} {billingAddress.pincode}<br/>
                                <i className="bi bi-telephone me-2"></i>+91 {billingAddress.phone}
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;