import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
    const { user, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/payment/orders", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <header className="profile-header">
                    <div className="user-avatar">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="user-info">
                        <h1>{user?.name}</h1>
                        <p>{user?.email}</p>
                    </div>
                </header>

                <section className="transaction-history">
                    <h2>Transaction History</h2>
                    {loading ? (
                        <p className="loading">Loading your transactions...</p>
                    ) : orders.length === 0 ? (
                        <p className="no-orders">No transactions found yet.</p>
                    ) : (
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div key={order.id} className="order-card">
                                    <div className="order-main">
                                        <div className="order-type-badge">
                                            {order.type}
                                        </div>
                                        <div className="order-amount">
                                            ₹{order.amount}
                                        </div>
                                    </div>
                                    <div className="order-details">
                                        <p><strong>Order ID:</strong> {order.razorpay_order_id}</p>
                                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p><strong>Status:</strong> <span className={`status-${order.status}`}>{order.status}</span></p>
                                        {order.details && (
                                            <div className="sub-details">
                                                {order.details.operator && <p><strong>Operator:</strong> {order.details.operator}</p>}
                                                {order.details.mobileNumber && <p><strong>Number:</strong> {order.details.mobileNumber}</p>}
                                                {order.details.name && <p><strong>Service:</strong> {order.details.name}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Profile;
