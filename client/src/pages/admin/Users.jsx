import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        { id: 1, profilePicture: "default-img.png", fullName: "John Doe", email: "john@example.com", phone: "1234567890", status: 1 },
        { id: 2, profilePicture: "default-img.png", fullName: "Jane Smith", email: "jane@example.com", phone: "9876543210", status: 0 },
        { id: 3, profilePicture: "default-img.png", fullName: "Alice Brown", email: "alice@example.com", phone: "4567891230", status: -1 },
    ]);

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete this user? This action cannot be undone!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", `User has been removed.`, "success");
            }
        });
    };



    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <div>
                    <h1>User Management</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Users</li>
                    </ol>
                </div>
                <Link className="btn btn-primary" to="/admin/add-user">Add User</Link>
            </div>

            <div className="card-body">
                <table className="table border text-nowrap">
                    <thead className="table-light">
                        <tr>
                            <th>User Image</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Account Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <img src={`/img/users/${user.profilePicture}`} alt={user.fullName} style={{ width: 50, height: 50, objectFit: "cover" }} />
                                    </td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        {user.status === 1 ? "Active" : user.status === 0 ? "Inactive" : "Deleted"}
                                    </td>
                                    <td className="d-flex gap-1">
                                        <Link to="/admin/user-details" className="btn btn-info btn-sm">View</Link>
                                        <Link to="/admin/update-user" className="btn btn-warning btn-sm">Edit</Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete()}>Delete</button>
                                        <Link to="/admin/cart" className="btn btn-info btn-sm">Cart</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6">No users to display!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
