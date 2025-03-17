import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
    const products = [
        {
            id: 1,
            name: "IPhone 15 Pro Max",
            category: "Apple",
            categoryId: 1,
            image: "67409349bfcac_71yzJoE7WlL._SX679_.jpg",
            price: 139000,
            salePrice: 149000,
            discount: 20,
            stock: 10,
            rating: 4,
            reviews: 25
        },
        {
            id: 2,
            name: "Galaxy S23 Ultra",
            category: "Samsung",
            categoryId: 2,
            image: "670b6b6e1f2d1samsungs23ultra.jpg",
            price: 129000,
            salePrice: 139000,
            discount: 20,
            stock: 0,
            rating: 5,
            reviews: 15
        },
        {
            id: 3,
            name: "Realme 13 Pro",
            category: "Realme",
            categoryId: 3,
            image: "670e67e11fd13Relme13pro.jpg",
            price: 23999,
            salePrice: 26999,
            discount: 15,
            stock: 5,
            rating: 3,
            reviews: 30
        },
        {
            id: 4,
            name: "Oppo A3x",
            category: "Oppo",
            categoryId: 3,
            image: "671874f14018foppoa3x.jpg",
            price: 16999,
            salePrice: 19999,
            discount: 15,
            stock: 5,
            rating: 3,
            reviews: 30
        }
    ];

    const handleWishlistClick = () => {
        alert("Product added to wishlist successfully!");
        // toast.success("Product added to wishlist successfully!");
    };

    return (
        <div className="container py-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {products.map((product) => {
                    const isOutOfStock = product.stock <= 0;
                    return (
                        <div key={product.id} className="col">
                            <div className={`card h-100 border-0 shadow-sm hover-elevation rounded-3 ${isOutOfStock ? 'opacity-75' : ''}`}>
                                <div className="position-relative">
                                    <Link to="/product" className="text-decoration-none">
                                        <img 
                                            className="card-img-top p-3 rounded-3" 
                                            style={{ height: "240px", objectFit: "contain" }} 
                                            src={`/img/items/products/${product.image}`} 
                                            alt={product.name}
                                        />
                                    </Link>
                                    {product.discount > 0 && (
                                        <span className="position-absolute top-0 start-0 bg-primary text-white m-3 px-2 py-1 rounded-pill small">
                                            -{product.discount}% OFF
                                        </span>
                                    )}
                                    <button 
                                        className="btn position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow-sm"
                                        onClick={handleWishlistClick}
                                        style={{ width: "35px", height: "35px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <i className="fa-regular fa-heart text-primary small"></i>
                                    </button>
                                </div>
                                
                                <div className="card-body d-flex flex-column pt-2 justify-content-center align-items-center">
                                    <Link to="/product" className="text-decoration-none">
                                        <h6 className="card-title text-dark mb-1 small fw-semibold">{product.name}</h6>
                                    </Link>
                                    <small className="text-muted mb-2 smaller">{product.category}</small>
                                    
                                    <div className="mb-2">
                                        <span className="fw-bold text-primary me-2" style={{ fontSize: "0.95rem" }}>₹{product.price}</span>
                                        <span className="text-muted text-decoration-line-through small">₹{product.salePrice}</span>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="me-2">
                                            {[...Array(5)].map((_, index) => (
                                                <i 
                                                    key={index} 
                                                    className={`fa fa-star ${index < product.rating ? 'text-warning' : 'text-muted'}`}
                                                    style={{ fontSize: "0.8rem" }}
                                                ></i>
                                            ))}
                                        </div>
                                        <small className="text-muted smaller">({product.reviews})</small>
                                    </div>

                                    {isOutOfStock ? (
                                        <button 
                                            className="btn btn-outline-danger btn-md w-100 mt-auto rounded-pill" 
                                            disabled
                                        >
                                            Out of Stock
                                        </button>
                                    ) : (
                                        <Link 
                                            to="/cart" 
                                            className="btn btn-primary btn-md w-100 mt-auto d-flex align-items-center justify-content-center gap-2 rounded-pill"
                                        >
                                            <i className="fa fa-shopping-cart small"></i>
                                            <span className="small">Add to Cart</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="d-flex justify-content-center mt-4">
                <nav aria-label="Product navigation">
                    <ul className="pagination pagination-md">
                        <li className="page-item disabled">
                            <span className="page-link rounded-start-2">Previous</span>
                        </li>
                        <li className="page-item active">
                            <span className="page-link">1</span>
                        </li>
                        <li className="page-item">
                            <button className="page-link">2</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">3</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link rounded-end-2">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ProductList;
