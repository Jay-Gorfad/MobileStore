import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            error = name === "email" ? "Email is required" : "Password is required";
        } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Enter a valid email address";
        } else if (name === "password" && value.length < 6) {
            error = "Password must be at least 6 characters long";
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
        alert("Login successful!");
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="/img/banners/Side Image.png"
                        alt="Login Side Image" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ maxHeight: '100vh' }}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="w-100 p-4 p-md-5">
                        <div className="login-form mx-auto" style={{ maxWidth: '400px' }}>
                            <div className="text-center mb-5">
                                <h2 className="fw-bold mb-2">Welcome Back!</h2>
                                <p className="text-muted">Please login to your account</p>
                            </div>
                            
                            <form id="loginForm" onSubmit={handleSubmit} className="needs-validation">
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label small fw-medium">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-envelope text-muted"></i>
                                        </span>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="Enter your email" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label htmlFor="password" className="form-label small fw-medium">Password</label>
                                        <Link to="/forgot-password" className="text-decoration-none small">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-lock text-muted"></i>
                                        </span>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            name="password" 
                                            className={`form-control border-start-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder="Enter your password" 
                                            value={formData.password} 
                                            onChange={handleChange} 
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-3 mb-4 fw-medium"
                                >
                                    Sign In
                                </button>

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        Don't have an account? {' '}
                                        <Link to="/register" className="text-primary text-decoration-none fw-medium">
                                            Create Account
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
