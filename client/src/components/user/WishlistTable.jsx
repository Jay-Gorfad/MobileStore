import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const WishlistTable = ({ userId }) => {
  /* context & state -------------------------------------------------- */
  const { updateCartCount, updateWishlistCount } = useAuth();

  const [products, setProducts]   = useState([]);  // full product objects
  const [loading, setLoading]     = useState(true);
  const [addingToCartId, setAddingToCartId] = useState(null);

  /* fetch wishlist on mount / user change --------------------------- */
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) {                       // no user -> nothing to load
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);                    // fresh request
      try {
        const res = await axios.get(`http://localhost:8000/wishlist/${userId}`);

        // the API already gives us full product objects inside productIds
        const items = res.data?.wishlist?.productIds || [];

        setProducts(items);
        updateWishlistCount(items.length);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        toast.error("Failed to load wishlist.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId, updateWishlistCount]);

  /* remove from wishlist -------------------------------------------- */
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/wishlist/${userId}/remove`, {
        data: { productId },
      });

      const updated = products.filter((p) => p._id !== productId);
      setProducts(updated);
      updateWishlistCount(updated.length);
      toast.success("Product removed from wishlist!");
    } catch (err) {
      console.error("Error removing product:", err);
      toast.error("Failed to remove product.");
    }
  };

  /* add to cart ------------------------------------------------------ */
  const handleAddToCart = async (productId) => {
    if (!userId) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    setAddingToCartId(productId);
    try {
      const res = await axios.post("http://localhost:8000/cart", {
        userId,
        productId,
        quantity: 1,
      });

      updateCartCount(res.data?.items?.length || 0);
      toast.success("Product added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart.");
    } finally {
      setAddingToCartId(null);
    }
  };

  /* render ----------------------------------------------------------- */
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-heart fa-3x text-muted mb-3" />
        <h5 className="text-muted">Your wishlist is empty</h5>
        <Link to="/shop" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      {products.map((item) => (
        <div key={item._id} className="card-body border-bottom p-4">
          <div className="row align-items-center">
            {/* image -------------------------------------------------- */}
            <div className="col-md-3 col-4">
              <img
                src={item.productImage}
                alt={item.productName}
                className="img-fluid rounded"
              />
            </div>

            {/* info --------------------------------------------------- */}
            <div className="col-md-9 col-8">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="fw-medium mb-0">{item.productName}</h6>

                {/* delete btn */}
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => handleDelete(item._id)}
                >
                  <i className="fas fa-trash" />
                </button>
              </div>

              <div className="text-muted small mb-3">
                ₹{(item.salePrice - (item.salePrice * item.discount / 100)).toFixed(2)}
              </div>

              {/* add‑to‑cart btn */}
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleAddToCart(item._id)}
                disabled={addingToCartId === item._id}
              >
                <i className="fas fa-shopping-cart me-2" />
                {addingToCartId === item._id ? "Adding…" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistTable;
