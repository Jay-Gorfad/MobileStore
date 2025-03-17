import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategory = () => {
    const [formData, setFormData] = useState({
        categoryName: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate field
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;

        if (name === "categoryName") {
            if (!value.trim()) {
                error = "Category name is required.";
            } else if (value.length < 3) {
                error = "Category name must be at least 3 characters.";
            } else if (value.length > 50) {
                error = "Category name cannot exceed 50 characters.";
            }
        }

        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        toast.success("Category added successfully");
    };

    return (
        <div>
            <h1 className="mt-4">Add Category</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/admin/categories">Categories</Link>
                </li>
                <li className="breadcrumb-item active">Add Category</li>
            </ol>

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="categoryName" className="form-label">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoryName"
                                        name="categoryName"
                                        value={formData.categoryName}
                                        onChange={handleChange}
                                    />
                                    {errors.categoryName && <div className="text-danger">{errors.categoryName}</div>}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Add Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
