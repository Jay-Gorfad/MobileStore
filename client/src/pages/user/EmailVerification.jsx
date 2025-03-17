import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const oldEmail = "old@example.com";
    const newEmail = "new@example.com";
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldOtp: "",
        newOtp: ""
    });
    const [errors, setErrors] = useState({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [resendEnabled, setResendEnabled] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setResendEnabled(true);
            return;
        }
        const countdown = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, [timeLeft]);

    const validateOtp = (otp) => {
        if (!otp.trim()) return "OTP is required.";
        if (otp.length !== 6 || isNaN(otp)) return "Enter a valid 6-digit OTP.";
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Only allow digits and limit to 6 characters
        const sanitizedValue = value.replace(/\D/g, '').slice(0, 6);
        setFormData({ ...formData, [name]: sanitizedValue });
        setErrors(prevErrors => ({ ...prevErrors, [name]: validateOtp(sanitizedValue) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateOtp(formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        navigate("/account", { state: { message: "Email updated successfully!" } });
    };

    const handleResendOtp = () => {
        setTimeLeft(60);
        setResendEnabled(false);
        alert("OTP resent successfully!");
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="/img/banners/Side Image.png"
                        alt="Email Verification Side Image" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ maxHeight: '100vh' }}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="w-100 p-4 p-md-5">
                        <div className="verification-form mx-auto" style={{ maxWidth: '400px' }}>
                            <div className="text-center mb-5">
                                <h2 className="fw-bold mb-2">Email Verification</h2>
                                <p className="text-muted">Enter the verification codes sent to your emails</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="needs-validation">
                                <div className="mb-4">
                                    <label className="form-label small fw-medium">Old Email</label>
                                    <p className="text-primary small mb-2 fw-medium">{oldEmail}</p>
                                    <div className="input-group input-group-lg shadow-sm">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-key text-primary"></i>
                                        </span>
                                        <input 
                                            type="text"
                                            name="oldOtp"
                                            className={`form-control form-control-lg border-start-0 ps-0 ${errors.oldOtp ? 'is-invalid' : ''}`}
                                            placeholder="Enter 6-digit OTP"
                                            value={formData.oldOtp}
                                            onChange={handleChange}
                                            maxLength={6}
                                            style={{ backgroundColor: '#fff' }}
                                        />
                                        {errors.oldOtp && <div className="invalid-feedback">{errors.oldOtp}</div>}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-medium">New Email</label>
                                    <p className="text-primary small mb-2 fw-medium">{newEmail}</p>
                                    <div className="input-group input-group-lg shadow-sm">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-key text-primary"></i>
                                        </span>
                                        <input 
                                            type="text"
                                            name="newOtp"
                                            className={`form-control form-control-lg border-start-0 ps-0 ${errors.newOtp ? 'is-invalid' : ''}`}
                                            placeholder="Enter 6-digit OTP"
                                            value={formData.newOtp}
                                            onChange={handleChange}
                                            maxLength={6}
                                            style={{ backgroundColor: '#fff' }}
                                        />
                                        {errors.newOtp && <div className="invalid-feedback">{errors.newOtp}</div>}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg w-100 py-3 mb-4 fw-medium shadow-sm"
                                    disabled={!!errors.oldOtp || !!errors.newOtp || !formData.oldOtp || !formData.newOtp}
                                >
                                    Verify Email
                                </button>

                                <div className="text-center">
                                    {timeLeft > 0 ? (
                                        <p className="text-muted mb-0">
                                            Resend OTP in <span className="text-primary fw-medium">{timeLeft}</span> seconds
                                        </p>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={handleResendOtp}
                                            className="btn btn-link text-primary text-decoration-none p-0 fw-medium"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
