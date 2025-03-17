import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const UpdateProfileForm = () => {
    const [formData, setFormData] = useState({
        firstName: 'Jay',
        lastName: 'Gorfad',
        phone: '7600242424',
        userImage: null
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));

        // Validate and clear errors when corrected
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateField('userImage', file);
            setErrors(prevErrors => ({ ...prevErrors, userImage: error }));

            if (!error) {
                setFormData(prevData => ({ ...prevData, userImage: file }));
            }
        }
    };

    const validateField = (name, value) => {
        let error = null;
        const nameRegex = /^[A-Za-z\s]+$/; // Only letters & spaces
        const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits
        const maxSize = 1 * 1024 * 1024; // 5MB

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) 
                    error = `${name === 'firstName' ? "First" : "Last"} name is required`;
                else if (!nameRegex.test(value))
                    error = "Only letters are allowed";
                else if (value.length < 3 || value.length > 30)
                    error = "Must be between 3 and 30 characters";
                break;

            case 'phone':
                if (!value.trim()) 
                    error = "Phone number is required";
                else if (!phoneRegex.test(value))
                    error = "Phone number must be exactly 10 digits";
                break;

            case 'userImage':
                if (value) {
                    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(value.type))
                        error = "Only JPG, JPEG, and PNG files are allowed";
                    else if (value.size > maxSize)
                        error = "File size must be less than 1MB";
                }
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
        alert("Profile updated successfully!");
        // toast.success('Profile updated successfully!', { position: "top-right" });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input 
                                type="text" 
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                id="firstName"
                                name="firstName" 
                                placeholder="Your Name" 
                                value={formData.firstName} 
                                onChange={handleChange} 
                            />
                            <label htmlFor="firstName">First Name</label>
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input 
                                type="text" 
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                id="lastName"
                                name="lastName" 
                                placeholder="Your Last name" 
                                value={formData.lastName} 
                                onChange={handleChange} 
                            />
                            <label htmlFor="lastName">Last Name</label>
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input 
                                type="number" 
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                id="phone"
                                name="phone" 
                                placeholder="Your Phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                            />
                            <label htmlFor="phone">Phone Number</label>
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Profile Picture</label>
                            <input 
                                type="file" 
                                className={`form-control ${errors.userImage ? 'is-invalid' : ''}`}
                                name="userImage" 
                                accept="image/*" 
                                onChange={handleFileChange}
                            />
                            {errors.userImage && <div className="invalid-feedback">{errors.userImage}</div>}
                        </div>
                        <div className="text-center mt-2">
                            <img 
                                src="/img/users/default-img.png" 
                                alt="Profile Picture" 
                                className="rounded-circle"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary">
                        Update Profile
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateProfileForm;
