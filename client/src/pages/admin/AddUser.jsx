import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        userImage: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const validateField = (name, value) => {
        const formatFieldName = (field) => {
            return field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
        };
    
        if (!value.trim()) return `${formatFieldName(name)} is required.`;
        
        switch (name) {
            case "firstName":
            case "lastName":
                if (value.length < 2) return `${formatFieldName(name)} must be at least 2 characters.`;
                if (value.length > 50) return `${formatFieldName(name)} cannot exceed 50 characters.`;
                if (!/^[A-Za-z\s]+$/.test(value)) return `${formatFieldName(name)} must contain only letters.`;
                break;
    
            case "email":
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Invalid email format.";
                break;
    
            case "phone":
                if (!/^\d{10}$/.test(value)) return "Phone number must be exactly 10 digits.";
                break;
    
            case "password":
                if (value.length < 6) return "Password must be at least 6 characters.";
                break;
    
            default:
                return null;
        }
        
        return null;
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setErrors({ ...errors, userImage: "Profile image is required." });
            return;
        }
        
        const allowedExtensions = ["jpg", "jpeg", "png"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        
        if (!allowedExtensions.includes(fileExtension)) {
            setErrors({ ...errors, userImage: "Profile image must be a JPG, JPEG, or PNG file." });
            return;
        }
        
        setErrors({ ...errors, userImage: null });
        setFormData({ ...formData, userImage: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = {};
        Object.keys(formData).forEach(field => {
            if (field !== "userImage") {
                const error = validateField(field, formData[field]);
                if (error) formErrors[field] = error;
            }
        });

        if (!formData.userImage) {
            formErrors.userImage = "Profile image is required.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        toast.success("User added successfully!");
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            userImage: ""
        });
    };

    return (
        <div>
            <h1 className="mt-4">Add User</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin/">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/admin/users">Users</Link></li>
                <li className="breadcrumb-item active">Add User</li>
            </ol>
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
                                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
                                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Phone</label>
                                <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                                {errors.phone && <p className="text-danger">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                                {errors.password && <p className="text-danger">{errors.password}</p>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">User Image</label>
                                <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                                {errors.userImage && <p className="text-danger">{errors.userImage}</p>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Add User</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;