import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext'; // adjust path if needed

const UpdatePasswordForm = () => {
    const { user } = useAuth();
    const email = user?.email;

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateField = (name, value) => {
        const maxLength = 20;
        switch (name) {
            case 'currentPassword':
                if (!value.trim()) return "Current password is required";
                if (value.length < 6) return "Password must be at least 6 characters";
                if (value.length > maxLength) return `Must not exceed ${maxLength} characters`;
                break;

            case 'newPassword':
                if (!value.trim()) return "New password is required";
                if (value.length < 6) return "Password must be at least 6 characters";
                if (value.length > maxLength) return `Must not exceed ${maxLength} characters`;
                if (value === formData.currentPassword) return "New password cannot be same as current";
                break;

            case 'confirmPassword':
                if (!value.trim()) return "Confirm password is required";
                if (value !== formData.newPassword) return "Passwords do not match";
                break;

            default:
                break;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        for (const field in formData) {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if (!email) {
            alert("User email not found.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.put("http://localhost:8000/users/update-password", {
                email,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            if (res.data.message === "Password updated successfully") {
                alert("Password updated successfully!");
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                alert(res.data.message || "Failed to update password.");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                />
                {errors.currentPassword && <small className="text-danger">{errors.currentPassword}</small>}
            </div>

            <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                />
                {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
            </div>

            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                />
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
            </div>

            <div className="d-flex justify-content-end">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Change Password"}
                </button>
            </div>
        </form>
    );
};

export default UpdatePasswordForm;
