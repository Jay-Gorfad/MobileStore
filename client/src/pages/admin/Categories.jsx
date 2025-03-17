import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: "Fruits", productCount: 10 },
        { id: 2, name: "Vegetables", productCount: 15 },
        { id: 3, name: "Dairy", productCount: 8 }
    ]);

    const handleDelete = (categoryId) => {
        Swal.fire({
            title: "Confirm Deletion",
            text: "Are you sure you want to delete this category? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                setCategories(categories.filter(category => category.id !== categoryId));
                Swal.fire({
                    title: "Deleted!",
                    text: "Category has been deleted successfully.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
            }
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <div>
                    <h1>Categories</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Categories</li>
                    </ol>
                </div>
                <Link className="btn btn-primary text-nowrap" to="/admin/add-category">Add Category</Link>
            </div>
            <div className="card-body">
                <table className="table border text-nowrap">
                    <thead className="table-light">
                        <tr className="text-nowrap">
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th>Products Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>{category.productCount}</td>
                                    <td>
                                        <div className="d-flex flex-nowrap">
                                            <Link className="btn btn-success btn-sm me-1" to="/admin/update-category">Edit</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">There is no category to display!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link" disabled>Previous</button></li>
                        <li className="page-item active"><button className="page-link" disabled>1</button></li>
                        <li className="page-item"><button className="page-link" disabled>2</button></li>
                        <li className="page-item"><button className="page-link" disabled>3</button></li>
                        <li className="page-item"><button className="page-link" disabled>Next</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Categories;
