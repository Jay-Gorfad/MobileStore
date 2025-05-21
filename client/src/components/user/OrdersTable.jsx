import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrdersTable = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get userId from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?._id) {
      setUserId(storedUser._id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch orders once userId is set
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/orders/user/${userId}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <p className="text-center py-4">Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center py-4">You have no orders yet.</p>;
  }

  return (
    <div className="table-responsive mt-4">
      <table className="table cart-table text-nowrap text-center">
        <thead className="table-light">
          <tr>
            <th className="text-start">Order ID</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Shipping</th>
            <th>Total</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const shipping = parseFloat(order.shippingCharge?.["$numberDecimal"] || 0).toFixed(2);
            const total = parseFloat(order.total?.["$numberDecimal"] || 0).toFixed(2);

            return (
              <tr key={order._id}>
                <td className="text-start">{order._id}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.orderStatus}</td>
                <td>₹{shipping}</td>
                <td>₹{total}</td>
                <td>
                  <Link className="btn btn-sm btn-primary" to={`/order/${order._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
