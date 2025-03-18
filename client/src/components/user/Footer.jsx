import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return (
        <footer className="bg-light py-5 mt-5">
            <div className="container">
                <div className="row g-4 justify-content-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <div className="px-md-5">
                            <Link to="/" className="text-decoration-none">
                                <h2 className="fw-bold text-primary mb-2">MobiTrendz</h2>
                            </Link>
                            <p className="text-muted mb-4">Swipe, Shop, Shine</p>
                            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                                <a href="#" className="text-muted hover-primary">
                                    <i className="bi bi-facebook fs-5"></i>
                                </a>
                                <a href="#" className="text-muted hover-primary">
                                    <i className="bi bi-twitter fs-5"></i>
                                </a>
                                <a href="#" className="text-muted hover-primary">
                                    <i className="bi bi-instagram fs-5"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <h5 className="fw-bold mb-4">Quick Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                                <Link to="/" className="text-muted text-decoration-none hover-primary">Home</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/shop" className="text-muted text-decoration-none hover-primary">Shop</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-muted text-decoration-none hover-primary">Contact</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/order-history" className="text-muted text-decoration-none hover-primary">Your Orders</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/cart" className="text-muted text-decoration-none hover-primary">Cart</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-5">
                        <h5 className="fw-bold mb-4">Newsletter</h5>
                        <p className="text-muted mb-4">Monthly digest of what's new and exciting from us.</p>
                        <form className="mb-4">
                            <div className="input-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter your email"
                                    aria-label="Email address"
                                />
                                <button className="btn btn-primary" type="submit">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="border-top pt-4 mt-4">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="text-muted mb-0">
                                © 2025 MobiTrendz. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </footer>
    )
}

export default Footer

