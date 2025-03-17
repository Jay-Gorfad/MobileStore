import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate and clear errors when corrected
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;
        if (!value.trim()) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')} is required`;        
        } else if (name === "firstName" && (value.length < 3 || value.length > 50)) {
            error = "First Name must be between 3 and 50 characters";
        } else if (name === "lastName" && (value.length < 3 || value.length > 50)) {
            error = "Last Name must be between 3 and 50 characters";
        } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Enter a valid email address";
        } else if (name === "phone" && !/^\d{10}$/.test(value)) {
            error = "Enter a valid 10-digit phone number";
        } else if (name === "password" && value.length < 6) {
            error = "Password must be at least 6 characters long";
        } else if (name === "confirmPassword" && value !== formData.password) {
            error = "Passwords do not match";
        }
        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.values(formErrors).some(error => error)) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        alert("Account created successfully!");
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="/img/banners/Side Image.png"
                        alt="Register Side Image" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ maxHeight: '100vh' }}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="w-100 p-4 p-md-5">
                        <div className="register-form mx-auto" style={{ maxWidth: '450px' }}>
                            <div className="text-center mb-5">
                                <h2 className="fw-bold mb-2">Create Account</h2>
                                <p className="text-muted">Please fill in your information</p>
                            </div>
                            
                            <form id="registrationForm" onSubmit={handleSubmit} className="needs-validation">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label htmlFor="firstName" className="form-label small fw-medium">First Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0">
                                                <i className="fas fa-user text-muted"></i>
                                            </span>
                                            <input 
                                                type="text" 
                                                name="firstName" 
                                                id="firstName"
                                                className={`form-control border-start-0 ps-0 ${errors.firstName ? 'is-invalid' : ''}`}
                                                placeholder="Enter first name" 
                                                value={formData.firstName} 
                                                onChange={handleChange} 
                                            />
                                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <label htmlFor="lastName" className="form-label small fw-medium">Last Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0">
                                                <i className="fas fa-user text-muted"></i>
                                            </span>
                                            <input 
                                                type="text" 
                                                name="lastName" 
                                                id="lastName"
                                                className={`form-control border-start-0 ps-0 ${errors.lastName ? 'is-invalid' : ''}`}
                                                placeholder="Enter last name" 
                                                value={formData.lastName} 
                                                onChange={handleChange} 
                                            />
                                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label small fw-medium">Email Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0">
                                                <i className="fas fa-envelope text-muted"></i>
                                            </span>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                id="email"
                                                className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                                                placeholder="Enter your email" 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="phone" className="form-label small fw-medium">Phone Number</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0">
                                                <i className="fas fa-phone text-muted"></i>
                                            </span>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                id="phone"
                                                className={`form-control border-start-0 ps-0 ${errors.phone ? 'is-invalid' : ''}`}
                                                placeholder="Enter phone number" 
                                                value={formData.phone} 
                                                onChange={handleChange} 
                                            />
                                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label small fw-medium">Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0">
                                                <i className="fas fa-lock text-muted"></i>
                                            </span>
                                            <input 
                                                type="password" 
                                                name="password" 
                                                id="password"
                                                className={`form-control border-start-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
                                                placeholder="Create password" 
                                                value={formData.password} 
                                                onChange={handleChange} 
                                            />
                                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="confirmPassword" className="form-label small fw-medium">Confirm Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0">
                                                <i className="fas fa-lock text-muted"></i>
                                            </span>
                                            <input 
                                                type="password" 
                                                name="confirmPassword" 
                                                id="confirmPassword"
                                                className={`form-control border-start-0 ps-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                placeholder="Confirm password" 
                                                value={formData.confirmPassword} 
                                                onChange={handleChange} 
                                            />
                                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary w-100 py-3 mb-3 fw-medium">
                                            Create Account
                                        </button>
                                    </div>

                                    <div className="col-12 text-center">
                                        <p className="text-muted mb-0">
                                            Already have an account? {' '}
                                            <Link to="/login" className="text-primary text-decoration-none fw-medium">
                                                Sign In
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
