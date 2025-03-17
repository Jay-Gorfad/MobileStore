import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const MyProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let message = location.state?.message;
    useEffect(() => {
        toast.success(message);
    }, []);
    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        profilePicture: null,
    });

    const [emailForm, setEmailForm] = useState({
        adminEmail: "admin@example.com", // Static data
    });

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        adminPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleProfileChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue = type === "file" ? files[0] : value;
        setProfileForm({ ...profileForm, [name]: newValue });

        const error = validateField(name, newValue);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailForm({ ...emailForm, [name]: value });

        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm({ ...passwordForm, [name]: value });

        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;

        if (name === "firstName" && !value) {
            error = "First name is required.";
        }

        if (name === "lastName" && !value) {
            error = "Last name is required.";
        }

        if (name === "phoneNumber") {
            if (!value) {
                error = "Phone number is required.";
            } else if (!/^\d{10}$/.test(value)) {
                error = "Invalid phone number format (10 digits required).";
            }
        }

        if (name === "profilePicture") {
            if (value && !["image/jpeg", "image/png", "image/jpg"].includes(value.type)) {
                error = "Only JPG, JPEG, and PNG images are allowed.";
            }
        }

        if (name === "adminEmail") {
            if (!value) {
                error = "Email is required.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Invalid email format.";
            }
        }

        if (name === "oldPassword" && value.length < 6) {
            error = "Old password must be at least 6 characters.";
        }

        if (name === "adminPassword" && value.length < 6) {
            error = "New password must be at least 6 characters.";
        }

        if (name === "confirmPassword" && value !== passwordForm.adminPassword) {
            error = "Passwords do not match.";
        }

        return error;
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(profileForm).forEach((field) => {
            const error = validateField(field, profileForm[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        toast.success("Profile updated successfully!");
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(emailForm).forEach((field) => {
            const error = validateField(field, emailForm[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        navigate("/admin/verify-email");
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(passwordForm).forEach((field) => {
            const error = validateField(field, passwordForm[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        toast.success("Password updated successfully!");
    };

    return (
        <div>
            <h1 className="mt-4">Admin Settings</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                <li className="breadcrumb-item active">Admin Settings</li>
            </ol>

            {/* Profile Update */}
            <div className="card mb-4">
                <div className="card-header"><h4>Update Profile</h4></div>
                <div className="card-body">
                    <form onSubmit={handleProfileSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={profileForm.firstName} onChange={handleProfileChange} />
                            {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={profileForm.lastName} onChange={handleProfileChange} />
                            {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="text" className="form-control" name="phoneNumber" value={profileForm.phoneNumber} onChange={handleProfileChange} />
                            {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Profile Picture</label>
                            <input type="file" className="form-control" name="profilePicture" accept="image/png, image/jpeg, image/jpg" onChange={handleProfileChange} />
                            {errors.profilePicture && <p className="text-danger">{errors.profilePicture}</p>}
                            <img src="/img/users/default-img.png" alt="User" height="150px" className="mt-2" />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            </div>

            {/* Password Update */}
            <div className="card mb-4">
                <div className="card-header"><h4>Update Password</h4></div>
                <div className="card-body">
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Old Password</label>
                            <input type="password" className="form-control" name="oldPassword" value={passwordForm.oldPassword} onChange={handlePasswordChange} />
                            {errors.oldPassword && <p className="text-danger">{errors.oldPassword}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input type="password" className="form-control" name="adminPassword" value={passwordForm.adminPassword} onChange={handlePasswordChange} />
                            {errors.adminPassword && <p className="text-danger">{errors.adminPassword}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
                            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary">Update Password</button>
                    </form>
                </div>
            </div>

            {/* Email Update */}
            <div className="card mb-4">
                <div className="card-header"><h4>Update Email</h4></div>
                <div className="card-body">
                    <form onSubmit={handleEmailSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" name="adminEmail" value={emailForm.adminEmail} onChange={handleEmailChange} />
                            {errors.adminEmail && <p className="text-danger">{errors.adminEmail}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary">Update Email</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;