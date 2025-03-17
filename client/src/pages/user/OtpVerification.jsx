import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Get email from sessionStorage
        const resetEmail = sessionStorage.getItem('resetEmail');
        if (!resetEmail) {
            // If no email found, redirect to forgot password
            navigate('/forgot-password');
            return;
        }
        setEmail(resetEmail);
    }, [navigate]);

    const validateOtp = (otp) => {
        if (!otp.trim()) return "OTP is required";
        if (!/^\d{6}$/.test(otp)) return "OTP must be 6 digits";
        return "";
    };

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only allow digits and max 6 characters
        setOtp(value);
        // Validate on change
        const validationError = validateOtp(value);
        setError(validationError);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationError = validateOtp(otp);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        alert("OTP verified successfully!");
        // Navigate to reset password page
        navigate('/reset-password');
    };

    const handleResendOtp = () => {
        alert("New OTP sent to your email!");
        // Add your resend OTP logic here
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="/img/banners/Side Image.png"
                        alt="OTP Verification Side Image" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ maxHeight: '100vh' }}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="w-100 p-4 p-md-5">
                        <div className="otp-verification-form mx-auto" style={{ maxWidth: '400px' }}>
                            <div className="text-center mb-5">
                                <h2 className="fw-bold mb-2">Verify Your Email</h2>
                                <p className="text-muted mb-1">Please enter the 6-digit code sent to</p>
                                <p className="text-primary fw-medium">{email}</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="needs-validation">
                                <div className="mb-4">
                                    <label htmlFor="otp" className="form-label small fw-medium">OTP Code</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-key text-muted"></i>
                                        </span>
                                        <input 
                                            type="text" 
                                            id="otp" 
                                            className={`form-control border-start-0 ps-0 ${error ? 'is-invalid' : ''}`}
                                            placeholder="Enter 6-digit OTP" 
                                            value={otp}
                                            onChange={handleChange}
                                            maxLength={6}
                                        />
                                        {error && <div className="invalid-feedback">{error}</div>}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-3 mb-4 fw-medium"
                                    disabled={!!error || !otp}
                                >
                                    Verify OTP
                                </button>

                                <div className="text-center">
                                    <p className="text-muted mb-3">
                                        Didn't receive the code? {' '}
                                        <button 
                                            type="button" 
                                            className="btn btn-link text-primary text-decoration-none p-0 fw-medium"
                                            onClick={handleResendOtp}
                                        >
                                            Resend OTP
                                        </button>
                                    </p>
                                    <p className="text-muted mb-0">
                                        <Link to="/forgot-password" className="text-primary text-decoration-none fw-medium">
                                            Change Email
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

export default OtpVerification;
