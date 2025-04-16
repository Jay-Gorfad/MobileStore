import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!newEmail.trim()) {
            setError('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            setError('Enter a valid email address');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Email is required');
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Enter a valid email address');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/users/send-otp', { email });
            console.log(response)
            if (response.data.message === "OTP sent successfully") {
                // Store email temporarily (for OTP verify page)
                sessionStorage.setItem("resetEmail", email);
                navigate("/verify-otp");
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong";
            setError(msg);
        } finally {
            setLoading(false);
        }
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