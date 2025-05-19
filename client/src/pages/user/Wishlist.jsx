import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WishlistTable from "../../components/user/WishlistTable";
import { useState } from "react";
import { useEffect } from "react";

const Wishlist = () => {
    const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    } else {
      navigate("/login"); // Redirect to login if user not found
    }
  }, [navigate]);

    return (
        <div className="container py-5">
            <div className="wishlist-content mx-auto" style={{ maxWidth: '800px' }}>
                <div className="text-center mb-5">
                    <h2 className="fw-bold mb-2">My Wishlist</h2>
                    <p className="text-muted">Items you've saved for later</p>
                </div>
                <WishlistTable userId={userId} />
            </div>
        </div>
    );
};

export default Wishlist;
