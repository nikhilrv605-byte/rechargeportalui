import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
    const { user, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Profile Settings States
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        mobile: "",
        userId: ""
    });
    const [favNumber, setFavNumber] = useState(localStorage.getItem("favouriteMobile") || "");
    const [tempFavNumber, setTempFavNumber] = useState(favNumber);
    const [notificationsOn, setNotificationsOn] = useState(true);

    useEffect(() => {
        if (user) {
            setUserInfo({
                name: user.name || "",
                email: user.email || "",
                mobile: user.mobile || "+91 9876543210",
                userId: user.id || "USR" + Math.floor(100000 + Math.random() * 900000)
            });
        }
    }, [user]);

    const handleSaveProfile = () => {
        setIsEditing(false);
        localStorage.setItem("favouriteMobile", tempFavNumber);
        setFavNumber(tempFavNumber);

        setSuccessMessage("Profile updated successfully");
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

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
                        <h1>{userInfo.name || user?.name}</h1>
                        <p>{userInfo.email || user?.email}</p>
                    </div>
                </header>

                <section className="profile-details-section">
                    <div className="section-header">
                        <h2>User Information</h2>
                        {!isEditing ? (
                            <button className="edit-btn" onClick={() => { setIsEditing(true); setTempFavNumber(favNumber); }}>Edit Profile</button>
                        ) : (
                            <button className="save-btn" onClick={handleSaveProfile}>Save Changes</button>
                        )}
                    </div>
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    <div className="info-grid">
                        <div className="info-group">
                            <label>Name</label>
                            {isEditing ? (
                                <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
                            ) : (
                                <p>{userInfo.name || "N/A"}</p>
                            )}
                        </div>
                        <div className="info-group">
                            <label>Email</label>
                            {isEditing ? (
                                <input type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                            ) : (
                                <p>{userInfo.email || "N/A"}</p>
                            )}
                        </div>
                        <div className="info-group">
                            <label>Mobile Number</label>
                            {isEditing ? (
                                <input type="text" value={userInfo.mobile} onChange={(e) => setUserInfo({ ...userInfo, mobile: e.target.value })} />
                            ) : (
                                <p>{userInfo.mobile || "N/A"}</p>
                            )}
                        </div>
                        <div className="info-group">
                            <label>User ID</label>
                            <p className="read-only">{userInfo.userId || "N/A"}</p>
                        </div>
                    </div>
                </section>

                <section className="favourite-recharge-section">
                    <h2>Favourite Recharge</h2>
                    <div className="info-group">
                        <label>Favourite Mobile Number</label>
                        {isEditing ? (
                            <input
                                type="text"
                                placeholder="Enter favourite number"
                                value={tempFavNumber}
                                onChange={(e) => setTempFavNumber(e.target.value)}
                            />
                        ) : (
                            <p>{favNumber || "No favourite number set"}</p>
                        )}
                    </div>
                </section>

                <section className="settings-section">
                    <h2>Settings</h2>
                    <div className="setting-item">
                        <label>Notifications</label>
                        <div className={`toggle-switch ${notificationsOn ? 'on' : 'off'}`} onClick={() => setNotificationsOn(!notificationsOn)}>
                            <div className="toggle-knob"></div>
                        </div>
                    </div>
                </section>

                <div className="last-updated">
                    <p>Last Updated: Today</p>
                </div>


            </div>
        </div>
    );
};

export default Profile;
