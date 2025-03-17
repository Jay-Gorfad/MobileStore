import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
    const userId = 101;
    const user = { firstName: "John", lastName: "Doe" };

    const [cart, setCart] = useState([
        { id: 1, name: "Apple", quantity: 2, price: 50, image: "66ee9001ceeaeapple.webp" },
        { id: 2, name: "Cookie cake", quantity: 1, price: 40, image: "cookiecake.webp" },
        { id: 3, name: "Hide & Seek", quantity: 3, price: 20, image: "hide&seek.webp" },
    ]);

    const handleRemove = () => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to remove this product from the cart?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Removed!", `Product has been removed.`, "success");
            }
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <div>
                    <h1>Cart of {user.firstName} {user.lastName}</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/users">Users</Link></li>
                        <li className="breadcrumb-item active">Cart</li>
                    </ol>
                </div>
                <Link className="btn btn-primary text-nowrap" to="/admin/add-to-cart">Add Items</Link>
            </div>

            <div className="card-body">
                <table className="table border text-nowrap align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={`/img/items/products/${item.image}`} alt={item.name} style={{ width: 50, height: 50, objectFit: "cover" }} className="me-2" />
                                            <Link to="/admin/view-product">{item.name}</Link>
                                        </div>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price}</td>
                                    <td>₹{item.quantity * item.price}</td>
                                    <td>
                                        <div class="d-flex gap-1">
                                            <Link className="btn btn-info" to="/admin/update-cart">
                                                Update
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => handleRemove()}>
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">No items in the cart.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <Link className="page-link" to="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item">
                            <Link className="page-link" to="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Cart;
