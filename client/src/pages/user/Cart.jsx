import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
	const shippingCharge = 50;
	const subtotal = 139000;
	const total = subtotal + shippingCharge;

	const [cart, setCart] = useState([
		{
			id: 1,
			name: "IPhone 15 Pro Max",
			price: 139000,
			image: "img/items/products/67409349bfcac_71yzJoE7WlL._SX679_.jpg",
			quantity: 1,
		},
		{
			id: 2,
			name: "Galaxy S23 Ultra",
			price: 129000,
			image: "img/items/products/670b6b6e1f2d1samsungs23ultra.jpg",
			quantity: 1,
		},
		{
			id: 3,
			name: "Oppo A3x",
			price: 16999,
			image: "img/items/products/671874f14018foppoa3x.jpg",
			quantity: 1,
		},
	]);

	const handleQuantityChange = (id, amount) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + amount) }
					: item
			)
		);
	};

	return (
		<div className="container py-5">
			<div className="cart-content mx-auto" style={{ maxWidth: '800px' }}>
				<div className="text-center mb-5">
					<h2 className="fw-bold mb-2">Shopping Cart</h2>
					<p className="text-muted">Review and manage your items</p>
				</div>

				{cart.length > 0 ? (
					<>
						<div className="card shadow-sm mb-4">
							{cart.map((product) => (
								<CartItem
									key={product.id}
									product={product}
									onQuantityChange={handleQuantityChange}
								/>
							))}
						</div>
						<CartActions />
						<CartSummary
							subtotal={subtotal}
							shippingCharge={shippingCharge}
							total={total}
						/>
					</>
				) : (
					<div className="text-center py-5">
						<i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
						<h5 className="text-muted">Your cart is empty</h5>
						<Link to="/shop" className="btn btn-primary mt-3">
							Continue Shopping
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

const CartItem = ({ product, onQuantityChange }) => {
	const handleDelete = () => {
		alert("Product removed from cart!");
	};

	return (
		<div className="card-body border-bottom p-4">
			<div className="row align-items-center">
				<div className="col-md-3 col-4">
					<img
						src={product.image}
						alt={product.name}
						className="img-fluid rounded"
					/>
				</div>
				<div className="col-md-9 col-8">
					<div className="d-flex justify-content-between align-items-start mb-2">
						<h6 className="fw-medium mb-0">{product.name}</h6>
						<button
							className="btn btn-link text-danger p-0"
							onClick={handleDelete}
						>
							<i className="fas fa-trash"></i>
						</button>
					</div>
					<div className="text-muted small mb-2">₹{product.price}</div>
					<div className="d-flex align-items-center">
						<div className="input-group input-group-sm" style={{ width: '120px' }}>
							<button
								className="btn btn-outline-secondary"
								onClick={() => onQuantityChange(product.id, -1)}
							>
								<i className="fas fa-minus"></i>
							</button>
							<input
								type="text"
								className="form-control text-center"
								value={product.quantity}
								readOnly
							/>
							<button
								className="btn btn-outline-secondary"
								onClick={() => onQuantityChange(product.id, 1)}
							>
								<i className="fas fa-plus"></i>
							</button>
						</div>
						<div className="ms-auto fw-medium">
							₹{product.price * product.quantity}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const CartActions = () => {
	const [offerCode, setOfferCode] = useState("");
	const [error, setError] = useState("");

	const handleApply = (e) => {
		e.preventDefault();
		if (!validateOfferCode()) return;
		alert("Offer code applied successfully!");
	};

	const handleChange = (e) => {
		setOfferCode(e.target.value);
		validateOfferCode(e.target.value);
	};

	const validateOfferCode = (code = offerCode) => {
		if (!code.trim()) {
			setError("Please enter an offer code!");
			return false;
		}
		setError("");
		return true;
	};

	return (
		<div className="card shadow-sm mb-4">
			<div className="card-body p-4">
				<form onSubmit={handleApply}>
					<div className="row g-2">
						<div className="col">
							<input
								type="text"
								className={`form-control ${error ? 'is-invalid' : ''}`}
								placeholder="Enter offer code"
								value={offerCode}
								onChange={handleChange}
							/>
							{error && <div className="invalid-feedback">{error}</div>}
						</div>
						<div className="col-auto">
							<button 
								type="submit" 
								className="btn btn-primary px-4"
								disabled={!offerCode || error}
							>
								Apply
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

const CartSummary = ({ subtotal, shippingCharge, total }) => {
	return (
		<div className="card shadow-sm">
			<div className="card-body p-4">
				<h5 className="card-title mb-4">Order Summary</h5>
				<div className="d-flex justify-content-between mb-3">
					<span className="text-muted">Subtotal</span>
					<span className="fw-medium">₹{subtotal}</span>
				</div>
				<div className="d-flex justify-content-between mb-3">
					<span className="text-muted">Shipping</span>
					<span className="fw-medium">₹{shippingCharge}</span>
				</div>
				<hr />
				<div className="d-flex justify-content-between mb-4">
					<span className="fw-medium">Total</span>
					<span className="fw-bold">₹{total}</span>
				</div>
				<Link
					to="/checkout"
					className="btn btn-primary w-100 py-3 fw-medium"
				>
					Proceed to Checkout
				</Link>
				<Link
					to="/shop"
					className="btn btn-link w-100 text-muted mt-2"
				>
					Continue Shopping
				</Link>
			</div>
		</div>
	);
};

export default Cart;
