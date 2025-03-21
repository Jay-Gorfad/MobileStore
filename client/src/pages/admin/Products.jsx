import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList = () => {
    const [products] = useState([
        {
            id: 1,
            name: "iPhone 16 Pro",
            image: "/img/items/products/670a1a5f5a213_15Plus.jpg",  // Use correct path
            salePrice: 150000,
            discount: 5,
            soldQuantity: 50,
            stock: 10,
            category: "iPhone"
        },
        {
            id: 2,
            name: "Samsung Galaxy S24",
            image: "/img/items/products/670b6b6e1f2d1samsungs23ultra.jpg",
            salePrice: 120000,
            discount: 10,
            soldQuantity: 30,
            stock: 15,
            category: "Samsung"
        },
        {
            id: 1,
            name: "iPhone 16 Pro",
            image: "/img/items/products/670ba3dc98da615.jpg",  // Use correct path
            salePrice: 150000,
            discount: 5,
            soldQuantity: 50,
            stock: 10,
            category: "iPhone"
        },
    ]);
    

    const handleDelete = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "Deleted!",
                    "The product has been deleted.",
                    "success"
                );
                // Add deletion logic here
            }
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <div>
                    <h1>Products</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin" style={{ color: "blue", textDecoration: "none" }}>
  Dashboard
</Link></li>
                        <li className="breadcrumb-item active">Products</li>
                    </ol>
                </div>
                <Link className="btn btn-primary text-nowrap" to="/admin/add-product">Add Product</Link>
            </div>
            <div className="card-body">
                <table className="table border text-nowrap">
                    <thead className="table-light">
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Sold Quantity</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt={product.name} style={{ width: 50, height: 50, objectFit: "cover" }} />
                                        <span className="ms-2">{product.name}</span>
                                    </td>
                                    <td>₹{product.salePrice}</td>
                                    <td>{product.discount}%</td>
                                    <td>{product.soldQuantity}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <div className="d-flex flex-nowrap">
                                            <Link className="btn btn-info btn-sm me-1" to="/admin/view-product">View</Link>
                                            <Link className="btn btn-success btn-sm me-1" to="/admin/update-product">Update</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">There are no products to display!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;