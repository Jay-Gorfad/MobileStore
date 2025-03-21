import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const orders = [
  {
    orderId: 1,
    customerName: "Jay Barasiya",
    orderDate: "2025-03-12",
    totalQuantity: 3,
    totalPrice: 150000.5,
    orderStatus: "Pending",
  },
  {
    orderId: 2,
    customerName: "Prince Bhatt",
    orderDate: "2025-03-11",
    totalQuantity: 2,
    totalPrice: 120000.0,
    orderStatus: "Shipped",
  },
  {
    orderId: 3,
    customerName: "Jay Gorfad",
    orderDate: "2025-03-11",
    totalQuantity: 4,
    totalPrice: 120000.0,
    orderStatus: "Shipped",
  },
];

const OrderTable = () => {
  return (
    <div className="card-body">
      <table className="table border text-nowrap">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                <Link to={`/admin/user-details`} style={{ color: "blue", textDecoration: "none" }}>{order.customerName}</Link>
                </td>
                <td>{order.orderDate}</td>
                <td>{order.totalQuantity}</td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>{order.orderStatus}</td>
                <td>
                  <div className="d-flex flex-nowrap">
                    <Link to={`/admin/view-order`} className="btn btn-info btn-sm me-1">
                      View
                    </Link>
                    <Link to={`/admin/update-order`} className="btn btn-primary btn-sm me-1">
                      Edit
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete()}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const handleDelete = () => { 
  Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Deleted!", "Order has been deleted.", "success");
			}
		});
};

export default OrderTable;
