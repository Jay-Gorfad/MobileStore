import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const UpdatePasswordForm = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
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
        const maxLength = 20; 
    
        switch (name) {
            case 'currentPassword':
                if (!value.trim()) 
                    error = "Current password is required";
                else if (value.length < 6) 
                    error = "Password must be at least 6 characters long";
                else if (value.length > maxLength)
                    error = `Password must not exceed ${maxLength} characters`;
                break;
    
            case 'newPassword':
                if (!value.trim()) 
                    error = "New password is required";
                else if (value.length < 6) 
                    error = "Password must be at least 6 characters long";
                else if (value.length > maxLength)
                    error = `Password must not exceed ${maxLength} characters`;
                else if (value === formData.currentPassword) 
                    error = "New password cannot be the same as the current password";
                break;
    
            case 'confirmPassword':
                if (!value.trim()) 
                    error = "Confirm password is required";
                else if (value.length > maxLength)
                    error = `Password must not exceed ${maxLength} characters`;
                else if (value !== formData.newPassword) 
                    error = "Passwords do not match";
                break;
    
            default:
                break;
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
        alert("Password change successfully!");
        // toast.success('Password change successfully!');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input 
                        type="password" 
                        className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                        id="currentPassword"
                        name="currentPassword" 
                        placeholder="Current password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                    />
                    <label htmlFor="currentPassword">Current Password</label>
                    {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input 
                        type="password" 
                        className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                        id="newPassword"
                        name="newPassword" 
                        placeholder="New password"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                    <label htmlFor="newPassword">New Password</label>
                    {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input 
                        type="password" 
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword" 
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                        Change Password
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdatePasswordForm;
