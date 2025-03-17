import React from 'react';
import { Link } from 'react-router-dom';

const WishlistTable = () => {
    const wishlist = [
        { id: 1, name: "IPhone 15 Pro Max", price: 139000, image: "img/items/products/67409349bfcac_71yzJoE7WlL._SX679_.jpg" },
        { id: 2, name: "Galaxy S23 Ultra", price: 129000, image: "img/items/products/670b6b6e1f2d1samsungs23ultra.jpg" },
        { id: 3, name: "Oppo A3x", price: 16999, image: "img/items/products/671874f14018foppoa3x.jpg" }
    ];

    const handleDelete = () => {
        alert('Product removed from wishlist!');
    };

    if (wishlist.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="fas fa-heart fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">Your wishlist is empty</h5>
                <Link to="/shop" className="btn btn-primary mt-3">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="card shadow-sm">
            {wishlist.map((item) => (
                <div key={item.id} className="card-body border-bottom p-4">
                    <div className="row align-items-center">
                        <div className="col-md-3 col-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-md-9 col-8">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="fw-medium mb-0">{item.name}</h6>
                                <button
                                    className="btn btn-link text-danger p-0"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                            <div className="text-muted small mb-3">₹{item.price}</div>
                            <Link
                                to="/cart"
                                className="btn btn-primary btn-sm"
                            >
                                <i className="fas fa-shopping-cart me-2"></i>
                                Add to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WishlistTable;
