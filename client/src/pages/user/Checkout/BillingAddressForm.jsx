import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const BillingAddressForm = () => {
    const [formData, setFormData] = useState({
        billingFirstName: '',
        billingLastName: '',
        billingAddress: '',
        billingApartment: '',
        billingCity: '',
        billingState: '',
        billingPinCode: '',
        billingPhone: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
    };

    const validateField = (name, value) => {
        if (!value.trim()) {
            return `${getFieldLabel(name)} is required`;
        }
    
        // Name, City, State: Only letters allowed, Min: 3, Max: 50
        if (["billingFirstName", "billingLastName", "billingCity", "billingState"].includes(name)) {
            if (!/^[A-Za-z\s]+$/.test(value)) {
                return `${getFieldLabel(name)} should contain only letters`;
            }
            if (value.length < 3 || value.length > 50) {
                return `${getFieldLabel(name)} must be between 3 and 50 characters`;
            }
        }
    
        // Street Address: Min 5, Max 100 characters
        if (name === "billingAddress" && (value.length < 5 || value.length > 100)) {
            return "Street Address must be between 5 and 100 characters";
        }
    
        // Pin Code: Exactly 6 digits
        if (name === "billingPinCode" && !/^\d{6}$/.test(value)) {
            return "Pin Code must be exactly 6 digits";
        }
    
        // Phone: Exactly 10 digits
        if (name === "billingPhone" && !/^\d{10}$/.test(value)) {
            return "Phone number must be exactly 10 digits";
        }
    
        return null; // No errors
    };
    
    const getFieldLabel = (fieldName) => {
        const fieldLabels = {
            billingFirstName: "First Name",
            billingLastName: "Last Name",
            billingCity: "City",
            billingState: "State",
            billingAddress: "Street Address",
            billingPinCode: "Pin Code",
            billingPhone: "Phone Number",
        };
        return fieldLabels[fieldName] || "This field";
    };
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        toast.success('Billing details saved successfully!');
    };

    return (
        <div >
            <form id="billingForm" className="needs-validation" onSubmit={handleSubmit}>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Billing Details</h2>
                        <div className="row g-3">
                            {['billingFirstName', 'billingLastName', 'billingCity', 'billingState', 'billingPinCode', 'billingPhone'].map((field, index) => (
                                <div className="col-md-6" key={index}>
                                    <label className="form-label">
                                        {getFieldLabel(field)}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input 
                                        name={field}
                                        type="text"
                                        className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                                        placeholder={getFieldLabel(field)}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                    {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                                </div>
                            ))}
                            <div className="col-12">
                                <label className="form-label">
                                    Street Address
                                    <span className="text-danger">*</span>
                                </label>
                                <textarea 
                                    name="billingAddress"
                                    className={`form-control ${errors.billingAddress ? 'is-invalid' : ''}`}
                                    rows="2"
                                    placeholder="Street Address"
                                    value={formData.billingAddress}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.billingAddress && <div className="invalid-feedback">{errors.billingAddress}</div>}
                            </div>
                            <div className="col-12">
                                <label className="form-label">Apartment, Floor, etc. (Optional)</label>
                                <textarea
                                    name="billingApartment"
                                    className="form-control"
                                    rows="2"
                                    placeholder="Apartment, Floor, etc."
                                    value={formData.billingApartment}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-transparent d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                            Save Address
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BillingAddressForm;
