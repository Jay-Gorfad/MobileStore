import React from "react";
import { Link } from "react-router-dom";
import WishlistTable from "../../components/user/WishlistTable";

const Wishlist = () => {
    return (
        <div className="container py-5">
            <div className="wishlist-content mx-auto" style={{ maxWidth: '800px' }}>
                <div className="text-center mb-5">
                    <h2 className="fw-bold mb-2">My Wishlist</h2>
                    <p className="text-muted">Items you've saved for later</p>
                </div>
                <WishlistTable />
            </div>
        </div>
    );
};

export default Wishlist;
