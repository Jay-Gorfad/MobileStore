import React, { useEffect } from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileForm from './UpdateProfileForm';
import WishlistTable from '../../../components/user/WishlistTable';
import OrdersTable from '../../../components/user/OrdersTable';
import UpdateEmailForm from './UpdateEmailForm';
import { useLocation } from "react-router-dom";

const MyAccount = () => {
    const location = useLocation();
    const message = location.state?.message;
    
    useEffect(() => {
        if (message) {
            alert(message);
        }
    }, [message]);
    
    return (
        <div className="container py-5">
            <div className="account-content mx-auto" >
                <div className="text-center mb-5">
                    <h2 className="fw-bold mb-2">My Account</h2>
                    <p className="text-muted">Manage your profile and security</p>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        {/* Profile Section */}
                        <div className="mb-5">
                            <h5 className="fw-bold mb-4">Edit Your Profile</h5>
                            <UpdateProfileForm />
                        </div>

                        <hr className="my-4" />

                        {/* Email Section */}
                        <div className="mb-5">
                            <h5 className="fw-bold mb-4">Change Email</h5>
                            <UpdateEmailForm />
                        </div>

                        <hr className="my-4" />

                        {/* Password Section */}
                        <div>
                            <h5 className="fw-bold mb-4">Change Password</h5>
                            <UpdatePasswordForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
