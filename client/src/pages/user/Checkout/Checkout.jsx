// src/pages/user/Checkout.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BillingAddressForm from "./BillingAddressForm";

const Checkout = () => {
  /* ───────────────────────── state ──────────────────────────────── */
  const [addresses, setAddresses]   = useState([]);
  const [cartItems, setCartItems]   = useState([]);
  const [selected, setSelected]     = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [errors, setErrors]         = useState({});
  const [offer, setOffer]           = useState(null);
  const [discount, setDiscount]     = useState(0);

  const user    = JSON.parse(localStorage.getItem("user"));
  const userId  = user?._id;
  const nav     = useNavigate();

  /* ───────────────────────── effects ────────────────────────────── */
  useEffect(() => {
    if (!userId) return;
    fetchAddresses(userId);
    fetchCart(userId);
  }, [userId]);

  useEffect(() => {
    const raw = sessionStorage.getItem("appliedOffer");
    if (raw && cartItems.length) applyOffer(JSON.parse(raw));
  }, [cartItems]);

  /* ───────────────────────── helpers ────────────────────────────── */
  const fetchAddresses = async (uid) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/addresses/user/${uid}`);
      setAddresses(data || []);
    } catch (e) { console.error(e); }
  };

  const fetchCart = async (uid) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/cart/${uid}`);
      setCartItems(data.items || []);
    } catch (e) { console.error(e); }
  };

  const applyOffer = (o) => {
    const sub = cartItems.reduce(
      (t, it) =>
        t +
        it.productId.salePrice * (1 - it.productId.discount / 100) * it.quantity,
      0
    );
    if (sub >= o.minimumOrder) {
      const raw = (sub * o.discount) / 100;
      setOffer(o);
      setDiscount(Math.min(raw, o.maxDiscount));
      sessionStorage.setItem("appliedOffer", JSON.stringify(o));
    } else {
      setOffer(null);
      setDiscount(0);
    }
  };

  const sub   = cartItems.reduce(
    (t, i) =>
      t + i.productId.salePrice * (1 - i.productId.discount / 100) * i.quantity,
    0
  );
  const ship  = 50;
  const total = sub + ship - discount;

  /* ──────────────────────── razorpay flow ───────────────────────── */
  const placeOrder = async () => {
    if (!selected) {
      setErrors({ address: "Please select an address." });
      return;
    }

    try {
      const ck = await axios.get(`http://localhost:8000/orders/check-stock/${userId}`);
      if (ck.status === 400) {
        toast.error(ck.data.message);
        return;
      }

      const { data } = await axios.post("http://localhost:8000/payment/create-order", {
        amount: total,
      });
      if (!data.success) { toast.error("Payment order failed"); return; }

      const rzp = new window.Razorpay({
        key: "rzp_test_mEljxG2Cvuw6qT",
        order_id: data.order.id,
        amount:   data.order.amount,
        currency: data.order.currency,
        name: "Mobitrendz",
        description: "Purchase",
        prefill: {
          name: addresses.find((a) => a._id === selected)?.fullName,
          email: user.email,
          contact: addresses.find((a) => a._id === selected)?.phone,
        },
        theme: { color: "#0d6efd" },
        handler: async (res) => {
          try {
            const conf = await axios.post("http://localhost:8000/orders/checkout", {
              userId,
              addressId: selected,
              promoCodeId: offer?._id || null,
              razorpayOrderId: res.razorpay_order_id,
              razorpayPaymentId: res.razorpay_payment_id,
              razorpaySignature: res.razorpay_signature,
            });
            if (conf.status === 201) {
              toast.success("Order placed!");
              nav("/order-history");
            } else {
              toast.error("Payment OK but order failed.");
            }
          } catch { toast.error("Server error after payment"); }
        },
        modal: { ondismiss: () => toast.info("Payment cancelled") },
      });
      rzp.open();
    } catch (e) {
      toast.error(e.response?.data?.message || "Checkout error");
    }
  };

  /* ───────────────────────── render ─────────────────────────────── */
  return (
    <div className="checkout-page pb-5">

      {/* breadcrumb */}
      <div className="bg-primary-subtle py-2 mb-4">
        <div className="container d-flex align-items-center gap-2 small">
          <Link to="/" className="text-primary text-decoration-none">Home</Link> /
          <Link to="/cart" className="text-primary text-decoration-none">Cart</Link> /
          <span className="text-primary fw-semibold">Checkout</span>
        </div>
      </div>

      {/* stepper */}
      <div className="container mb-5">
        <ul className="d-flex justify-content-between list-unstyled stepper-blue">
          {["Cart", "Address", "Payment", "Done"].map((s, i) => (
            <li key={s} className={`step ${i <= 1 ? "active" : ""}`}>
              <span className="circle">{i + 1}</span>
              <span className="label">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="container">

        {/* ===== Addresses ===== */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-primary">Delivery Address</h5>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Back" : "+ New Address"}
            </button>
          </div>

          {showForm ? (
            <BillingAddressForm
              userId={userId}
              fetchAddresses={fetchAddresses}
              onClose={() => setShowForm(false)}
            />
          ) : (
            <>
              <div className="row g-3">
                {addresses.map((a) => {
                  const active = selected === a._id;
                  return (
                    <div className="col-md-6" key={a._id}>
                      <label
                        className={`address-tile border rounded p-3 d-flex gap-3 align-items-start ${active ? "border-primary shadow-sm" : "border-300"}`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          className="form-check-input mt-1"
                          checked={active}
                          onChange={() => {
                            setSelected(a._id);
                            setErrors((e) => ({ ...e, address: "" }));
                          }}
                        />
                        <div>
                          <strong className="d-block">{a.fullName}</strong>
                          <small className="d-block text-muted">
                            {a.address}, {a.city}, {a.state} {a.pincode}
                          </small>
                          <small className="text-muted">+91 {a.phone}</small>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
              {errors.address && (
                <p className="text-danger mt-2">{errors.address}</p>
              )}
            </>
          )}
        </section>

        {/* ===== Order Summary ===== */}
        <section className="mb-5">
          <div className="card border-primary">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">

              {cartItems.map((it) => (
                <div key={it._id} className="d-flex align-items-center mb-3">
                  <img
                    src={it.productId.productImage}
                    alt={it.productId.productName}
                    className="rounded me-3"
                    style={{ width: 64, height: 64, objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium small">{it.productId.productName}</p>
                    <small className="text-muted">× {it.quantity}</small>
                  </div>
                  <div className="fw-medium small">
                    ₹{(
                      it.productId.salePrice *
                      (1 - it.productId.discount / 100) *
                      it.quantity
                    ).toFixed(2)}
                  </div>
                </div>
              ))}

              <hr />

              <CostRow label="Subtotal" value={sub} />
              <CostRow label="Shipping" value={ship} />
              {discount > 0 && <CostRow label="Discount" value={-discount} danger />}
              <hr />
              <CostRow label="Total" value={total} bold />

              <button
                className="btn btn-primary w-100 mt-3 py-2"
                onClick={placeOrder}
              >
                Pay &amp; Place Order
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* ───────────────── helper components ─────────────────────────────── */
const CostRow = ({ label, value, bold, danger }) => (
  <div className="d-flex justify-content-between mb-2">
    <span className={bold ? "fw-bold" : "text-muted"}>{label}</span>
    <span className={`fw-medium ${danger ? "text-danger" : "text-primary"}`}>
      ₹{value.toFixed(2)}
    </span>
  </div>
);

export default Checkout;

