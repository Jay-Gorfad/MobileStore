import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user came from OTP verification
        const resetEmail = sessionStorage.getItem('resetEmail');
        if (!resetEmail) {
            // If no email found, redirect to forgot password
            navigate('/forgot-password');
        }
    }, [navigate]);

    const validateField = (name, value) => {
        if (!value.trim()) return `${name === 'password' ? 'Password' : 'Confirm password'} is required`;
        if (name === 'password' && value.length < 6) return "Password must be at least 6 characters";
        if (name === 'confirmPassword' && value !== formData.password) return "Passwords do not match";
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Validate current field
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));

        // Validate confirm password when password changes
        if (name === 'password' && formData.confirmPassword) {
            const confirmError = validateField('confirmPassword', formData.confirmPassword);
            setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
        }
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
        alert("Password reset successfully!");
        // Clear the reset email from session
        sessionStorage.removeItem('resetEmail');
        // Navigate to login page
        navigate('/login');
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="/img/banners/Side Image.png"
                        alt="Reset Password Side Image" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ maxHeight: '100vh' }}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="w-100 p-4 p-md-5">
                        <div className="reset-password-form mx-auto" style={{ maxWidth: '400px' }}>
                            <div className="text-center mb-5">
                                <h2 className="fw-bold mb-2">Reset Password</h2>
                                <p className="text-muted">Create your new password</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="needs-validation">
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label small fw-medium">New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-lock text-muted"></i>
                                        </span>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            name="password"
                                            className={`form-control border-start-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder="Enter new password" 
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label small fw-medium">Confirm Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-lock text-muted"></i>
                                        </span>
                                        <input 
                                            type="password" 
                                            id="confirmPassword" 
                                            name="confirmPassword"
                                            className={`form-control border-start-0 ps-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            placeholder="Confirm new password" 
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-3 mb-4 fw-medium"
                                    disabled={!!errors.password || !!errors.confirmPassword || !formData.password || !formData.confirmPassword}
                                >
                                    Reset Password
                                </button>

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        <Link to="/login" className="text-primary text-decoration-none fw-medium">
                                            Back to Sign In
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

export default ResetPassword;
