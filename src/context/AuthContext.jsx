import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("authToken") || null);

    useEffect(() => {
        // Check for saved user data on load
        const savedUser = localStorage.getItem("user");
        if (savedUser && token) {
            try {
                setUser(JSON.parse(savedUser));
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Error parsing user from localStorage", e);
            }
        }
    }, [token]);

    const login = (userData, userToken) => {
        setIsLoggedIn(true);
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", userToken);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
