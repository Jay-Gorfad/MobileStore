import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdatePasswordForm = () => {
    
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

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

    const handleSubmit = async (e) => {
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
        setLoading(true);

        try {
            const response = await axios.put("http://localhost:8000/users/update-password", {
                email,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            if (response.data.message === "Password updated successfully") {
                toast.success("Password updated successfully!");
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                toast.error(response.data.message || "Failed to update password.");
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    id="currentPassword"
                    placeholder="Enter current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                />
                {errors.currentPassword && <div className="text-danger">{errors.currentPassword}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                />
                {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            </div>

            <div className="d-flex justify-content-end">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Change Password"}
                </button>
            </div>
        </form>
    );
};

export default UpdatePasswordForm;
