// src/pages/user/OrderDetails.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  /* ------------------------------------------------------------------ */
  /*  Route‑param & local state                                         */
  /* ------------------------------------------------------------------ */
  const { orderId }          = useParams();
  const [order, setOrder]    = useState(null);     // whole order doc
  const [items, setItems]    = useState([]);       // orderItems array
  const [loading, setLoading]= useState(true);

  /* ------------------------------------------------------------------ */
  /*  API fetch on mount / id change                                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:8000/orders/${orderId}`);
        // backend returns { order, orderItems }
        setOrder(data.order);
        setItems(data.orderItems || []);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        toast.error("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                           */
  /* ------------------------------------------------------------------ */
  const getStatusColor = (status) => ({
    Processing: "warning",
    Shipped: "info",
    Delivered: "success",
    Cancelled: "danger",
    Pending: "secondary",
  }[status] || "primary");

  const handleReorder = () => toast.success("Re‑order placed successfully!");

  if (loading)
    return <div className="text-center my-5">Loading…</div>;

  if (!order)
    return <div className="text-center my-5">Order not found.</div>;

  /* ---- numeral helpers -------------------------------------------- */
  const num = (dec) => parseFloat(dec?.["$numberDecimal"] || dec || 0);
  const lineTotal = (it) => num(it.price) * it.quantity;

  const subFromLines   = items.reduce((t, it) => t + lineTotal(it), 0);
  const shipping       = num(order.shippingCharge);
  const grandTotal     = num(order.total);
  const discount       = subFromLines - (grandTotal - shipping);

  /* ---- aliases for brevity ---------------------------------------- */
  const customer = order.userId;
  const address  = order.delAddressId;

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div className="container py-5">

      {/* breadcrumb + reorder button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/"           className="text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/order-history" className="text-decoration-none">Orders</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              #{order._id}
            </li>
          </ol>
        </nav>

      </div>

      {/* order summary card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="mb-0">Order #{order._id}</h4>
            </div>
            <div className="col-auto">
              <span className={`badge bg-${getStatusColor(order.orderStatus)} rounded-pill px-3 p-2`}>
                {order.orderStatus}
              </span>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row g-4">
            <Info col label="Order Date"          value={new Date(order.orderDate).toLocaleDateString()} />
            <Info col label="Payment Method"      value={order.paymentMode} />
            <Info col label="Shipping"            value={`₹${shipping.toFixed(2)}`} />
            <Info col label="Total Amount"        value={`₹${grandTotal.toFixed(2)}`} bold />
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* ----------------- order items ------------------------------ */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Items</h5>

              {items.map((it, i) => (
                <div key={i} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <img
                    src={it.productId.productImage}
                    alt={it.productId.productName}
                    className="rounded"
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-1">{it.productId.productName}</h6>
                    <div className="text-muted">
                      Qty: {it.quantity} × ₹{num(it.price).toFixed(2)}
                    </div>
                  </div>
                  <div className="ms-3 fw-bold">
                    ₹{lineTotal(it).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="border-top pt-3">
                <div className="row justify-content-end">
                  <div className="col-md-5">
                    <SummaryRow label="Subtotal"    value={subFromLines} />
                    <SummaryRow label="Shipping"    value={shipping} />
                    {discount > 0 && <SummaryRow label="Discount" value={-discount} danger />}
                    <SummaryRow label="Total"       value={grandTotal} bold />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- customer & address ----------------------- */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Customer Details</h5>
              <p className="mb-1"><strong>{customer?.firstName} {customer?.lastName}</strong></p>
              <p className="mb-1"><i className="bi bi-telephone me-2" />+91 {customer?.mobile}</p>
              <p className="mb-0"><i className="bi bi-envelope  me-2" />{customer?.email}</p>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Delivery Address</h5>
              <address className="mb-0">
                <strong>{address.fullName}</strong><br />
                {address.address}<br />
                {address.city}, {address.state} {address.pincode}<br />
                <i className="bi bi-telephone me-2" />+91 {address.phone}
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ====================================================================== */
/*  Small presentational helpers                                          */
/* ====================================================================== */
const Info = ({ label, value, bold }) => (
  <div className="col-md-3">
    <div className="border-end pe-3">
      <small className="text-muted d-block">{label}</small>
      <strong className={bold ? "fw-bold" : ""}>{value}</strong>
    </div>
  </div>
);

const SummaryRow = ({ label, value, danger, bold }) => (
  <div className={`d-flex justify-content-between mb-2 ${bold ? "fw-bold" : ""}`}>
    <span>{label}</span>
    <span className={danger ? "text-danger" : ""}>₹{value.toFixed(2)}</span>
  </div>
);

export default OrderDetails;
