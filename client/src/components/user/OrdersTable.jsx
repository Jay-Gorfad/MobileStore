import React from "react";
import { Link } from "react-router-dom";

const OrdersTable = () => {
  const orders = [
    { id: 12345, date: "2025-03-10", quantity: 2, total: 1000 },
    { id: 12346, date: "2025-03-11", quantity: 1, total: 500 },
    { id: 12347, date: "2025-03-12", quantity: 3, total: 1500 },
  ];

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover text-center">
        <thead className="table-dark">
          <tr className="p-5">
            <th className="text-start">Order ID</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="text-start">{order.id}</td>
              <td>{order.date}</td>
              <td>{order.quantity}</td>
              <td>₹{order.total}.00</td>
              <td>
                <Link className="btn btn-primary btn-sm" to={`/order`}>
                  View Order
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
