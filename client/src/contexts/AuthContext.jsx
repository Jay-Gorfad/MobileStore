// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
        try {
            const userData = localStorage.getItem("user");
            // Check if the userData is not null and a valid JSON string
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null; // Return null if an error occurs
        }
    });

    // Log in function to store token and user data in localStorage and state
    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
    };

    // Log out function to clear token, user data from localStorage and state
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    // Update user data in state and localStorage
    const setUserData = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
