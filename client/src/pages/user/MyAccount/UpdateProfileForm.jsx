import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';

const UpdateProfileForm = ({ userData, onUpdate }) => {
    const { setUserData } = useAuth();
    const user = userData;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        profilePicture: null,
    });
    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState('/img/users/default-img.png');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            const { firstName, lastName, mobile, profilePicture } = user;
            setFormData({ firstName, lastName, mobile, profilePicture: null });
            if (profilePicture) setPreviewImage(profilePicture);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateField('profilePicture', file);
            setErrors(prev => ({ ...prev, profilePicture: error }));

            if (!error) {
                setFormData(prev => ({ ...prev, profilePicture: file }));
                setPreviewImage(URL.createObjectURL(file));
            }
        }
    };

    const validateField = (name, value) => {
        let error = null;
        const nameRegex = /^[A-Za-z\s]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const maxSize = 1 * 1024 * 1024;

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) error = `${name === 'firstName' ? "First" : "Last"} name is required`;
                else if (!nameRegex.test(value)) error = "Only letters are allowed";
                else if (value.length < 2 || value.length > 30) error = "Must be between 2 and 30 characters";
                break;
            case 'mobile':
                if (!value.trim()) error = "Mobile number is required";
                else if (!mobileRegex.test(value)) error = "Mobile number must be exactly 10 digits";
                break;
            case 'profilePicture':
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.values(formErrors).some(err => err)) {
            setErrors(formErrors);
            return;
        }

        const submitData = new FormData();
        submitData.append('firstName', formData.firstName);
        submitData.append('lastName', formData.lastName);
        submitData.append('mobile', formData.mobile);
        submitData.append('status', 'active');

        if (formData.profilePicture) {
            submitData.append('profilePicture', formData.profilePicture);
        }

        setLoading(true);

        try {
            const response = await axios.put(`http://localhost:8000/users/${user._id}`, submitData);
            setUserData(response.data);
            if (response.data) {
               alert("Profile updated successfully!");
                onUpdate && onUpdate();
            }
        } catch (err) {
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="form p-3 border rounded bg-light" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder="Your Name*"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <div className="text-danger small">{errors.firstName}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            placeholder="Your Last name*"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <div className="text-danger small">{errors.lastName}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Mobile</label>
                        <input
                            type="number"
                            className="form-control"
                            name="mobile"
                            placeholder="Your mobile*"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                        {errors.mobile && <div className="text-danger small">{errors.mobile}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">User Image</label>
                        <input
                            type="file"
                            className="form-control"
                            name="profilePicture"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {errors.profilePicture && <div className="text-danger small">{errors.profilePicture}</div>}
                    </div>

                    <div className="col-12 text-center">
                        <img src={previewImage} alt="Profile Preview" className="img-thumbnail mt-2" style={{ height: '100px' }} />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                        {loading ? "Loading..." : "Update Profile"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateProfileForm;
