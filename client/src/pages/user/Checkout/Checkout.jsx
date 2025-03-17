import React, { useState } from "react";
import BillingAddressForm from "./BillingAddressForm";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
	const [showBillingForm, setShowBillingForm] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [selectedPayment, setSelectedPayment] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!selectedAddress) validationErrors.address = "Please select an address.";
        if (!selectedPayment) validationErrors.payment = "Please select a payment method.";
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        navigate(`/order-confirm`);
    };

	const addresses = [
		{
			id: 1,
			fullName: "Jay Gorfad",
			phone: "7600242425",
			address: "Kothariya Main Road",
			city: "Rajkot",
			state: "Gujarat",
			pincode: "360002",
		},
		{
			id: 2,
			fullName: "Prince Bhatt",
			phone: "9865321010",
			address: "Kothariya Main Road",
			city: "Rajkot",
			state: "Gujarat",
			pincode: "360001",
		},
	];

	const toggleBillingForm = () => {
		setShowBillingForm(!showBillingForm);
	};

	return (
		<div className="bg-light min-vh-100 py-5">
			<div className="container">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-decoration-none text-muted">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/cart" className="text-decoration-none text-muted">Cart</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </nav>

				<div className="row g-4">
					<div className="col-lg-7">
						{showBillingForm && (
                            <div className="card shadow-sm mb-4">
                                <div className="card-body">
                                    <BillingAddressForm />
                                </div>
                            </div>
                        )}

						<div className="card shadow-sm">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-center mb-4">
									<h5 className="card-title mb-0">Shipping Address</h5>
									<button
										type="button"
										onClick={toggleBillingForm}
										className="btn btn-primary btn-sm"
									>
										Add New Address
									</button>
								</div>

								<AddressList 
                                    addresses={addresses} 
                                    setSelectedAddress={setSelectedAddress} 
                                    selectedAddress={selectedAddress} 
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                                {errors.address && 
                                    <div className="alert alert-danger py-2 mt-3">{errors.address}</div>
                                }
							</div>
						</div>
					</div>

					<div className="col-lg-5">
						<CheckoutSummary 
                            setSelectedPayment={setSelectedPayment} 
                            selectedPayment={selectedPayment}
                            handleSubmit={handleSubmit}
                            errors={errors}
                            setErrors={setErrors}
                        />
					</div>
				</div>
			</div>
		</div>
	);
};

const AddressList = ({ addresses, setSelectedAddress, selectedAddress, errors, setErrors }) => {
	const handleAddressChange = (event) => {
        const selectedAddressId = Number(event.target.value);
		setSelectedAddress(selectedAddressId);
        if(selectedAddressId < 0){
            setErrors({...errors, address:"Please select an address"});
        } else {
            setErrors({...errors, address:""});
        }
	};

	return (
		<div className="row g-3">
			{addresses.map((address) => (
				<div className="col-md-6" key={address.id}>
					<div className={`card h-100 ${selectedAddress === address.id ? 'border-primary' : 'border'}`}>
						<div className="card-body">
							<div className="form-check">
								<input
									type="radio"
									id={`address-${address.id}`}
									name="shipping-address"
									value={address.id}
									className="form-check-input"
									checked={selectedAddress === address.id}
									onChange={handleAddressChange}
								/>
								<label 
                                    className="form-check-label" 
                                    htmlFor={`address-${address.id}`}
                                    style={{cursor: "pointer"}}
                                >
									<strong>{address.fullName}</strong><br/>
									{address.phone}<br/>
									{address.address}<br/>
									{address.city}, {address.state}<br/>
									{address.pincode}
								</label>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

const CheckoutSummary = ({setSelectedPayment, selectedPayment, handleSubmit, errors, setErrors}) => {
	const products = [
		{
			id: 1,
			productName: "IPhone 15 Pro Max",
			price: 139000,
			productImage: "img/items/products/67409349bfcac_71yzJoE7WlL._SX679_.jpg",
			quantity: 1,
		},
		{
			id: 2,
			productName: "Samsung Galaxy S23 Ultra",
			price: 129000,
			productImage: "img/items/products/670b6b6e1f2d1samsungs23ultra.jpg",
			quantity: 1,
		},
		{
			id: 3,
			productName: "Oppo A3x",
			price: 16999,
			productImage: "img/items/products/671874f14018foppoa3x.jpg",
			quantity: 1,
		},
	];

	const subtotal = 139000.00;
	const shippingCharge = 50.0;
	const discountAmount = 100.0;
	const total = subtotal + shippingCharge - discountAmount;

	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
        if(event.target.value === ""){
            setErrors({...errors, payment:"Please select a payment method"});
        } else {
            setErrors({...errors, payment:""});
        }
	};

	return (
		<div className="card shadow-sm">
			<div className="card-body">
				<h5 className="card-title mb-4">Order Summary</h5>

				{products.map((product) => (
					<div className="d-flex align-items-center mb-3" key={product.id}>
						<img
							src={product.productImage}
							className="rounded"
							style={{width: "60px", height: "60px", objectFit: "cover"}}
							alt={product.productName}
						/>
						<div className="ms-3 flex-grow-1">
							<h6 className="mb-0">{product.productName}</h6>
							<small className="text-muted">Qty: {product.quantity}</small>
						</div>
						<div className="fw-bold">₹{product.price.toFixed(2)}</div>
					</div>
				))}

				<hr/>

				<div className="d-flex justify-content-between mb-2">
					<span>Subtotal</span>
					<span>₹{subtotal.toFixed(2)}</span>
				</div>

				<div className="d-flex justify-content-between mb-2">
					<span>Shipping</span>
					<span>₹{shippingCharge.toFixed(2)}</span>
				</div>

				{discountAmount > 0 && (
					<div className="d-flex justify-content-between mb-2">
						<span>Discount</span>
						<span className="text-success">-₹{discountAmount.toFixed(2)}</span>
					</div>
				)}

				<hr/>

				<div className="d-flex justify-content-between mb-4">
					<span className="fw-bold">Total</span>
					<span className="fw-bold">₹{total.toFixed(2)}</span>
				</div>

				<div className="mb-4">
					<h6 className="mb-3">Payment Method</h6>
					<div className="form-check mb-2">
						<input
							type="radio"
							id="cod"
							name="payment"
							value="COD"
							className="form-check-input"
							checked={selectedPayment === "COD"}
							onChange={handlePaymentChange}
						/>
						<label className="form-check-label" htmlFor="cod">
							Cash On Delivery
						</label>
					</div>
					<div className="form-check">
						<input
							type="radio"
							id="online"
							name="payment"
							value="Online"
							className="form-check-input"
							checked={selectedPayment === "Online"}
							onChange={handlePaymentChange}
						/>
						<label className="form-check-label" htmlFor="online">
							Online Payment
						</label>
					</div>
					{errors.payment && 
                        <div className="alert alert-danger py-2 mt-2">{errors.payment}</div>
                    }
				</div>

				<button
					className="btn btn-primary w-100"
					onClick={handleSubmit}
				>
					Place Order
				</button>
			</div>
		</div>
	);
};

export default Checkout;
