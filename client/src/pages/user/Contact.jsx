import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {
	const [formData, setFormData] = useState({
		contactName: "",
		contactEmail: "",
		contactPhone: "",
		contactMessage: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// Validate field and update errors
		const error = validateField(name, value);
		setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
	};

	const validateField = (name, value) => {
		let error = "";

		switch (name) {
			case "contactName":
				if (!value.trim()) error = "Name is required";
				break;
			case "contactEmail":
				if (!value.trim()) error = "Email is required";
				else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
					error = "Invalid email format";
				break;
			case "contactPhone":
				if (!value.trim()) error = "Phone number is required";
				else if (!/^\d{10}$/.test(value))
					error = "Phone number must be 10 digits";
				break;
			case "contactMessage":
				if (!value.trim()) error = "Message is required";
				else if (value.length < 10)
					error = "Message must be at least 10 characters";
				break;
			default:
				break;
		}
		return error;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate all fields
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
		toast.success("Message sent successfully!");
		setFormData({
			contactName: "",
			contactEmail: "",
			contactPhone: "",
			contactMessage: "",
		});
	};

	return (
		<div className="contact-page bg-light min-vh-100">
			<div className="container py-5">
				<div className="text-center mb-5">
					<h1 className="display-4 fw-bold text-primary mb-3">Get in Touch</h1>
					<p className="lead text-muted">We'd love to hear from you. Let us know how we can help.</p>
				</div>

				<div className="row g-4 justify-content-center">
					<div className="col-12 col-lg-4">
						<div className="bg-white rounded-3 shadow-sm p-4">
							<h4 className="mb-4 text-primary">Contact Information</h4>
							
							<div className="d-flex align-items-center mb-4">
								<i className="fas fa-phone text-primary fs-5 me-3"></i>
								<div>
									<div className="text-muted small">Phone</div>
									<div className="fw-medium">+91 87329 65892</div>
								</div>
							</div>

							<div className="d-flex align-items-center mb-4">
								<i className="fas fa-envelope text-primary fs-5 me-3"></i>
								<div>
									<div className="text-muted small">Email</div>
									<div className="fw-medium text-break">mobitrendz@gmail.com</div>
								</div>
							</div>

							<div className="d-flex align-items-center">
								<i className="fas fa-map-marker-alt text-primary fs-5 me-3"></i>
								<div>
									<div className="text-muted small">Address</div>
									<div className="fw-medium">123 Business Street,<br />Tech Park, Rajkot - 360002</div>
								</div>
							</div>

							{/* <hr className="my-4" />

							<div className="text-muted small">
								Business Hours:<br />
								Monday - Friday: 9:00 AM - 6:00 PM<br />
								Saturday: 10:00 AM - 4:00 PM<br />
								Sunday: Closed
							</div> */}
						</div>
					</div>

					<div className="col-12 col-lg-8">
						<div className="card border-0 shadow-sm">
							<div className="card-body p-4">
								<h3 className="card-title mb-4">Send us a Message</h3>
								<form id="contactForm" onSubmit={handleSubmit}>
									<div className="row g-3">
										<div className="col-md-6">
											<div className="form-floating">
												<input
													type="text"
													className={`form-control ${errors.contactName ? 'is-invalid' : ''}`}
													id="contactName"
													name="contactName"
													placeholder="Your Name"
													value={formData.contactName}
													onChange={handleChange}
												/>
												<label htmlFor="contactName">Your Name</label>
												{errors.contactName && <div className="invalid-feedback">{errors.contactName}</div>}
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-floating">
												<input
													type="email"
													className={`form-control ${errors.contactEmail ? 'is-invalid' : ''}`}
													id="contactEmail"
													name="contactEmail"
													placeholder="Your Email"
													value={formData.contactEmail}
													onChange={handleChange}
												/>
												<label htmlFor="contactEmail">Your Email</label>
												{errors.contactEmail && <div className="invalid-feedback">{errors.contactEmail}</div>}
											</div>
										</div>

										<div className="col-12">
											<div className="form-floating">
												<input
													type="tel"
													className={`form-control ${errors.contactPhone ? 'is-invalid' : ''}`}
													id="contactPhone"
													name="contactPhone"
													placeholder="Your Phone"
													value={formData.contactPhone}
													onChange={handleChange}
												/>
												<label htmlFor="contactPhone">Your Phone</label>
												{errors.contactPhone && <div className="invalid-feedback">{errors.contactPhone}</div>}
											</div>
										</div>

										<div className="col-12">
											<div className="form-floating">
												<textarea
													className={`form-control ${errors.contactMessage ? 'is-invalid' : ''}`}
													id="contactMessage"
													name="contactMessage"
													placeholder="Your Message"
													style={{ height: "150px" }}
													value={formData.contactMessage}
													onChange={handleChange}
												></textarea>
												<label htmlFor="contactMessage">Your Message</label>
												{errors.contactMessage && <div className="invalid-feedback">{errors.contactMessage}</div>}
											</div>
										</div>

										<div className="col-12">
											<button type="submit" className="btn btn-primary btn-lg w-100">
												Send Message
												<i className="fas fa-paper-plane ms-2"></i>
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
