import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateEmailForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Invalid email format";
        return null;
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setError(validateEmail(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }
        setError(null);
        navigate("/verify-email");
    };

    return (
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter your new email" 
                        value={email} 
                        onChange={handleChange} 
                    />
                    {error && <p className="text-danger mt-2">{error}</p>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Update Email</button>
                </div>
            </form>
    );
};

export default UpdateEmailForm;
