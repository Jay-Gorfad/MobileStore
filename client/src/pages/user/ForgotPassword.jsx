import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        if (!email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address";
        return "";
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        // Validate on change
        const validationError = validateEmail(value);
        setError(validationError);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Store email in sessionStorage for later use
        sessionStorage.setItem('resetEmail', email);
        
        setError("");
        alert("OTP sent to your email!");
        // Navigate to OTP verification page
        navigate('/verify-otp');
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="/img/banners/Side Image.png"
                        alt="Forgot Password Side Image" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ maxHeight: '100vh' }}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="w-100 p-4 p-md-5">
                        <div className="forgot-password-form mx-auto" style={{ maxWidth: '400px' }}>
                            <div className="text-center mb-5">
                                <h2 className="fw-bold mb-2">Forgot Password?</h2>
                                <p className="text-muted">Enter your email to reset your password</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="needs-validation">
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label small fw-medium">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-envelope text-muted"></i>
                                        </span>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            className={`form-control border-start-0 ps-0 ${error ? 'is-invalid' : ''}`}
                                            placeholder="Enter your email" 
                                            value={email}
                                            onChange={handleChange}
                                        />
                                        {error && <div className="invalid-feedback">{error}</div>}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-3 mb-4 fw-medium"
                                    disabled={!!error || !email}
                                >
                                    Send Reset Link
                                </button>

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        Remember your password? {' '}
                                        <Link to="/login" className="text-primary text-decoration-none fw-medium">
                                            Sign In
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

export default ForgotPassword;