import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileForm from './UpdateProfileForm';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext'; // adjust path if needed

const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const message = location.state?.message;
    const { user } = useAuth();
    const firstName = user?.firstName;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user._id) {
                    toast.error("User not found in local storage");
                    return;
                }

                const response = await axios.get(`http://localhost:8000/users/${user._id}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to load profile');
            }
        };

        fetchUserData();

        if (message) {
            toast.success(message);
        }
    }, [message]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                <p>
                    <a href="#" className="text-decoration-none dim link">Home /</a> Account
                </p>
                <p>Welcome! <span className="highlight">{firstName || 'User'}</span></p>
            </div>
            
            <div className="row mt-4 justify-content-center">
                <div className="col-md-8 col-lg-8">
                    {/* Card for Profile */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Edit Your Profile</h4>
                            {userData && <UpdateProfileForm userData={userData} />}
                        </div>
                    </div>

                    {/* Card for Email Change */}
                    {/* <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Change Email</h4>
                            {userData && <UpdateEmailForm email={userData.email} />}
                        </div>
                    </div> */}

                    {/* Card for Password Change */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Change Password</h4>
                            {userData && <UpdatePasswordForm email={userData.email} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
