// src/components/user/OrdersTable.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------------------------ */
  /*  Fetch active orders once on mount                                 */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/orders/active");
        // the API you showed earlier returns   { orders: [...] }
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Simple client‑side search                                         */
  /* ------------------------------------------------------------------ */
  const filtered = orders.filter((o) =>
    [
      o._id,
      o.userId?.firstName,
      o.userId?.lastName,
      o.orderStatus,
      new Date(o.orderDate).toLocaleDateString(),
      o.total?.$numberDecimal,
    ]
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div className="table-responsive">
      {/* search box */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search orders…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* loading spinner */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status" />
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-muted">No orders found.</p>
      )}

      {!loading && filtered.length > 0 && (
        <table className="table table-bordered text-center align-middle">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th className="text-start px-3">Order ID</th>
              <th>Order Date</th>
              <th>Items</th>
              <th>Total (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((o) => {
              const total = parseFloat(o.total?.$numberDecimal || 0).toFixed(2);
              const qty   = o.items?.length ?? o.quantity ?? 0;
              return (
                <tr key={o._id}>
                  <td className="text-start px-3">{o._id}</td>
                  <td>{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td>{qty}</td>
                  <td>₹{total}</td>
                  <td>{o.orderStatus}</td>
                  <td>
                    <Link
                      to={`/order/${o._id}`}
                      className="btn btn-sm text-white"
                      style={{ backgroundColor: "#007bff" }}
                    >
                      View Order
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersTable;
