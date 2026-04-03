import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("authToken") || null);
useEffect(() => {
    // First check localStorage (normal login)
    const savedUser = localStorage.getItem("user");

    if (savedUser && token) {
        try {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
            return;
        } catch (e) {
            console.error("Error parsing user", e);
        }
    }

    // 👇 ADD THIS PART FOR GOOGLE SESSION LOGIN
    fetch("http://localhost:8080/api/auth/me", {
        credentials: "include",
    })
        .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then((data) => {
            setUser(data);
            setIsLoggedIn(true);
        })
        .catch(() => {
            console.log("No active session");
        });

}, []);
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
