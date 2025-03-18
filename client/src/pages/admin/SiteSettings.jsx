import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SiteSettings = () => {
  // Static Data
  const [aboutContent, setAboutContent] = useState("This is about page content.");
  const [contactEmail, setContactEmail] = useState("mobitrendz@gmail.com");
  const [contactNumber, setContactNumber] = useState("9632587412");
  const [errors, setErrors] = useState({});

  // Validations
  const validateField = (name, value) => {
    let error = "";
    if (name === "aboutContent" && !value.trim()) {
      error = "About page content cannot be empty!";
    } else if (name === "contactEmail") {
      if (!value.trim()) {
        error = "Email is required!";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format!";
      }
    } else if (name === "contactNumber") {
      if (!value.trim()) {
        error = "Contact number is required!";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Contact number must be 10 digits!";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    validateField("aboutContent", aboutContent);
    validateField("contactEmail", contactEmail);
    validateField("contactNumber", contactNumber);
    return Object.values(errors).every((err) => err === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Swal.fire("Success", "Settings updated successfully!", "success");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <div>
          <h1>Site Settings</h1>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Site Settings</li>
          </ol>
        </div>
      </div>
      {/* About Page Section */}
      <div className="card mb-4">
        <div className="card-header"><h4>Update About Page Content</h4></div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">About Page Content</label>
              <textarea
                className="form-control"
                rows="5"
                value={aboutContent}
                onChange={(e) => {
                  setAboutContent(e.target.value);
                  validateField("aboutContent", e.target.value);
                }}
              />
              {errors.aboutContent && <small className="text-danger">{errors.aboutContent}</small>}
            </div>
            <button type="submit" className="btn btn-primary">Update About Page</button>
          </form>
        </div>
      </div>

      {/* Contact Page Section */}
      <div className="card mb-4">
        <div className="card-header"><h4>Update Contact Page Info</h4></div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Contact Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={contactEmail}
                  onChange={(e) => {
                    setContactEmail(e.target.value);
                    validateField("contactEmail", e.target.value);
                  }}
                />
                {errors.contactEmail && <small className="text-danger">{errors.contactEmail}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                    validateField("contactNumber", e.target.value);
                  }}
                />
                {errors.contactNumber && <small className="text-danger">{errors.contactNumber}</small>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Update Contact Info</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;