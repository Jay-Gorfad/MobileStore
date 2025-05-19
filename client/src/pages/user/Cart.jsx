// src/components/Cart.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const SHIPPING_CHARGE = 50;

const Cart = () => {
  /* ------------------------------------------------------------------ */
  /*  Context & state                                                   */
  /* ------------------------------------------------------------------ */
  const { cartCount, updateCartCount } = useAuth();
  const [items, setItems] = useState([]);          // cart lines from API
  const [offers, setOffers] = useState([]);        // active offers from API
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  /* ------------------------------------------------------------------ */
  /*  Fetch cart & offers on mount                                      */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?._id) {
          toast.error("User not found, please log in again.");
          return;
        }

        /* ---- cart -------------------------------------------------- */
        const cartRes = await axios.get(`http://localhost:8000/cart/${user._id}`);
        setItems(cartRes.data.items || []);
        updateCartCount(cartRes.data.items?.length || 0);

        /* ---- offers ------------------------------------------------ */
        const offerRes = await axios.get("http://localhost:8000/offers");
        setOffers(offerRes.data.filter((o) => o.activeStatus));

        /* ---- restore offer from session, if any -------------------- */
        const stored = sessionStorage.getItem("appliedOffer");
        if (stored) tryApplyOffer(JSON.parse(stored), cartRes.data.items || []);
      } catch (err) {
        toast.error("Failed to load cart / offers");
        console.error(err);
      }
    };

    fetchAll();
  }, [updateCartCount]);

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                           */
  /* ------------------------------------------------------------------ */
  const lineSubtotal = (item) => {
    const base = parseFloat(item.productId.salePrice) || 0;
    const disc = parseFloat(item.productId.discount) || 0;
    const net  = base - (base * disc) / 100;
    return net * item.quantity;
  };

  const cartSubtotal = items.reduce((t, it) => t + lineSubtotal(it), 0);

  const recalcDiscount = (offer, _items = items) => {
    if (!_items.length) return 0;
    const sub = _items.reduce((t, it) => t + lineSubtotal(it), 0);
    if (sub < offer.minimumOrder) return 0;
    const raw = sub * (offer.discount / 100);
    return Math.min(raw, offer.maxDiscount);
  };

  /* ------------------------------------------------------------------ */
  /*  Offer actions                                                     */
  /* ------------------------------------------------------------------ */
  const tryApplyOffer = (offer, _items = items) => {
    const d = recalcDiscount(offer, _items);
    if (d === 0) {
      toast.error(`This offer requires a minimum purchase of ₹${offer.minimumOrder}`);
      return;
    }
    setAppliedOffer(offer);
    setDiscountAmount(d);
    sessionStorage.setItem("appliedOffer", JSON.stringify(offer));
    toast.success("Offer applied successfully!");
  };

  /* ------------------------------------------------------------------ */
  /*  Quantity change                                                   */
  /* ------------------------------------------------------------------ */
  const changeQty = async (productId, delta) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const current = items.find((i) => i.productId._id === productId);
    if (!current) return;

    const newQty = Math.max(1, current.quantity + delta);

    try {
      await axios.put(`http://localhost:8000/cart/${user._id}`, {
        productId,
        quantity: newQty,
      });

      const updated = items.map((it) =>
        it.productId._id === productId ? { ...it, quantity: newQty } : it
      );
      setItems(updated);
      updateCartCount(updated.length);
      toast.success("Cart updated");
      if (appliedOffer) setDiscountAmount(recalcDiscount(appliedOffer, updated));
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Remove line                                                       */
  /* ------------------------------------------------------------------ */
  const removeLine = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.delete(`http://localhost:8000/cart/${user._id}`, {
        data: { productId },
      });
      const filtered = items.filter((i) => i.productId._id !== productId);
      setItems(filtered);
      updateCartCount(filtered.length);
      toast.success("Product removed");
      if (appliedOffer) setDiscountAmount(recalcDiscount(appliedOffer, filtered));
    } catch {
      toast.error("Failed to remove product");
    }
  };

  const total = cartSubtotal - discountAmount + SHIPPING_CHARGE;

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div className="container py-5">
      <div className="cart-content mx-auto" style={{ maxWidth: 800 }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2">Shopping Cart</h2>
          <p className="text-muted">Review and manage your items</p>
        </div>

        {/* ----------------- main content ---------------------------- */}
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* cart lines */}
            <div className="card shadow-sm mb-4">
              {items.map((line) => (
                <CartLine
                  key={line.productId._id}
                  line={line}
                  onQty={changeQty}
                  onRemove={removeLine}
                />
              ))}
            </div>

            {/* offers + summary */}
            <OfferList offers={offers} onApply={tryApplyOffer} applied={appliedOffer} />
            <Summary
              subtotal={cartSubtotal}
              shipping={SHIPPING_CHARGE}
              discount={discountAmount}
              total={total}
              appliedOffer={appliedOffer}
            />
          </>
        )}
      </div>
    </div>
  );
};

/* ====================================================================== */
/*  PRESENTATIONAL SUB‑COMPONENTS                                         */
/* ====================================================================== */

const EmptyCart = () => (
  <div className="text-center py-5">
    <i className="fas fa-shopping-cart fa-3x text-muted mb-3" />
    <h5 className="text-muted">Your cart is empty</h5>
    <Link to="/shop" className="btn btn-primary mt-3">
      Continue Shopping
    </Link>
  </div>
);

const CartLine = ({ line, onQty, onRemove }) => {
  const { productId: p, quantity } = line;

  const sale = parseFloat(p.salePrice) || 0;
  const disc = parseFloat(p.discount) || 0;
  const net  = sale - (sale * disc) / 100;

  return (
    <div className="card-body border-bottom p-4">
      <div className="row align-items-center">
        {/* image */}
        <div className="col-md-3 col-4">
          <img src={p.productImage} alt={p.productName} className="img-fluid rounded" />
        </div>

        {/* details */}
        <div className="col-md-9 col-8">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6 className="fw-medium mb-0">{p.productName}</h6>
            <button className="btn btn-link text-danger p-0" onClick={() => onRemove(p._id)}>
              <i className="fas fa-trash" />
            </button>
          </div>

          <div className="text-muted small mb-2">₹{net.toFixed(2)}</div>

          <div className="d-flex align-items-center flex-sm-nowrap flex-wrap">
            <div className="input-group input-group-sm" style={{ width: 120 }}>
              <button className="btn btn-outline-secondary" onClick={() => onQty(p._id, -1)}>
                <i className="fas fa-minus" />
              </button>
              <input
                type="text"
                readOnly
                className="form-control text-center"
                value={quantity}
              />
              <button className="btn btn-outline-secondary" onClick={() => onQty(p._id, 1)}>
                <i className="fas fa-plus" />
              </button>
            </div>
            <div className="ms-auto fw-medium">₹{(net * quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OfferList = ({ offers, onApply, applied }) => (
  <div className="card shadow-sm mb-4">
    <div className="card-body p-4">
      <h5 className="mb-3">Available Offers</h5>
      {!offers.length ? (
        <div className="alert alert-warning m-0">No active offers available.</div>
      ) : (
        <div className="list-group shadow-sm">
          {offers.map((o) => {
            const isApplied = applied && applied.offerCode === o.offerCode;
            return (
              <div
                key={o._id}
                className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
              >
                <div className="me-3">
                  <span className="badge bg-primary me-2">{o.offerCode}</span>
                  <span className="text-muted">
                    {o.discount}% off on orders over ₹{o.minimumOrder}
                  </span>
                </div>
                {isApplied ? (
                  <span className="badge bg-success">Applied</span>
                ) : (
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => onApply(o)}
                  >
                    Apply
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

const Summary = ({ subtotal, shipping, discount, total, appliedOffer }) => (
  <div className="card shadow-sm">
    <div className="card-body p-4">
      <h5 className="card-title mb-4">Order Summary</h5>

      <Row label="Subtotal" value={subtotal} />
      {appliedOffer && <Row label={`Offer (${appliedOffer.offerCode})`} value={-discount} />}
      <Row label="Shipping" value={shipping} />

      <hr />

      <Row label="Total" value={total} bold />
      <Link to="/checkout" className="btn btn-primary w-100 py-3 fw-medium mt-3">
        Proceed to Checkout
      </Link>
      <Link to="/shop" className="btn btn-link w-100 text-muted mt-2">
        Continue Shopping
      </Link>
    </div>
  </div>
);

const Row = ({ label, value, bold }) => (
  <div className="d-flex justify-content-between mb-3">
    <span className={bold ? "fw-medium" : "text-muted"}>{label}</span>
    <span className={bold ? "fw-bold" : "fw-medium"}>₹{value.toFixed(2)}</span>
  </div>
);

export default Cart;
