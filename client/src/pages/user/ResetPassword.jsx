import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("resetEmail");
        if (!storedEmail) {
            toast.error("Email not found. Please request a password reset.");
            navigate("/forgot-password");
        } else {
            setEmail(storedEmail);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;
        if (!value.trim()) {
            error = name === "newPassword" ? "New password is required" : "Confirm password is required";
        } else if (name === "newPassword" && value.length < 6) {
            error = "Password must be at least 6 characters long";
        } else if (name === "confirmPassword" && value !== formData.newPassword) {
            error = "Passwords do not match";
        }
        return error;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/users/reset-password", {
                email,
                newPassword: formData.newPassword
            });

            if (response.data.message === "Password updated successfully") {
                alert("Password reset successful!");
                navigate("/login");
            } else {
                alert("Failed to reset password. Please try again.");
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong. Please try again.";
            alert(msg);
        }
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
                                    <label htmlFor="newPassword" className="form-label small fw-medium">New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="fas fa-lock text-muted"></i>
                                        </span>
                                        <input 
                                            type="password" 
                                            id="newPassword" 
                                            name="newPassword"
                                            className={`form-control border-start-0 ps-0 ${errors.newPassword ? 'is-invalid' : ''}`}
                                            placeholder="Enter new password" 
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                        />
                                        {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
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
                                    disabled={
                                        !!errors.newPassword || 
                                        !!errors.confirmPassword || 
                                        !formData.newPassword || 
                                        !formData.confirmPassword
                                    }
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
