import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateEmailForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('jaygorfad00@gmail.com');
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input 
                        type="email" 
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="email"
                        name="email" 
                        placeholder="name@example.com" 
                        value={email} 
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email address</label>
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                        Update Email
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmailForm;