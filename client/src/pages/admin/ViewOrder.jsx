import React from "react";
import { Link } from "react-router-dom";

const ViewOrder = () => {
    const orderData = {
        orderId: "12345",
        orderDate: "2025-03-13",
        orderStatus: "Shipped",
        paymentMode: "Credit Card",
        shippingCharge: 50,
        total: 1050,
        user: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            mobileNo: "9876543210",
        },
        address: {
            fullName: "John Doe",
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            pincode: "10001",
            phone: "9876543210",
        },
        items: [
            {
                productId: "1",
                productName: "Apple",
                price: 200,
                quantity: 2,
                image: "/img/items/products/66ee9001ceeaeapple.webp",
            },
            {
                productId: "2",
                productName: "Carrots",
                price: 150,
                quantity: 3,
                image: "/img/items/products/carrots.webp",
            },
        ],
    };

    return (
        <div>
            <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
                <div>
                    <h1>View Order</h1>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item"><Link to={"/admin"}>Dashboard</Link></li>
                        <li class="breadcrumb-item"><Link to={"/admin/orders"}>Orders</Link></li>
                        <li class="breadcrumb-item active">View Order</li>
                    </ol>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header"><h5>Order Details</h5></div>
                <div className="card-body">
                    <p><strong>Order ID:</strong> {orderData.orderId}</p>
                    <p><strong>Status:</strong> {orderData.orderStatus}</p>
                    <p><strong>Order Date:</strong> {orderData.orderDate}</p>
                    <p><strong>Payment mode:</strong> {orderData.paymentMode}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-header"><h5>Shipping Address</h5></div>
                        <div className="card-body">
                            <p><strong>Name:</strong> {orderData.address.fullName}</p>
                            <p><strong>Street:</strong> {orderData.address.street}</p>
                            <p><strong>City:</strong> {orderData.address.city}</p>
                            <p><strong>State:</strong> {orderData.address.state}</p>
                            <p><strong>Zip Code:</strong> {orderData.address.pincode}</p>
                            <p><strong>Phone:</strong> {orderData.address.phone}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-header"><h5>User Information</h5></div>
                        <div className="card-body">
                            <p><strong>Name:</strong> {orderData.user.firstName} {orderData.user.lastName}</p>
                            <p><strong>Email:</strong> {orderData.user.email}</p>
                            <p><strong>Phone:</strong> {orderData.user.mobileNo}</p>
                        </div>
                    </div>
                </div>
            </div>

            

            <div className="card mb-4">
                <div className="card-header"><h5>Ordered Items</h5></div>
                <div className="card-body">
                    <table className="table border">
                        <thead className="table-light">
                            <tr>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.items.map((item) => (
                                <tr key={item.productId}>
                                    <td><img src={item.image} alt="Item" width="50" /></td>
                                    <td>{item.productName}</td>
                                    <td>₹{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="4" className="text-end">Subtotal:</th>
                                <td>₹{orderData.total - orderData.shippingCharge}</td>
                            </tr>
                            <tr>
                                <th colSpan="4" className="text-end">Shipping Charge:</th>
                                <td>₹{orderData.shippingCharge}</td>
                            </tr>
                            <tr>
                                <th colSpan="4" className="text-end">Total:</th>
                                <td>₹{orderData.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
