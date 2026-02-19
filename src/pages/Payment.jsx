import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Payment.css";

const Payment = () => {




const handlePaymentSubscription = async () => {

    if (!plan || !plan.price) {
        alert("Invalid plan details");
        return;
    }

    try {
        setIsProcessing(true);

        // 1️⃣ Create Razorpay Order from Backend
        const orderResponse = await fetch(
            `http://localhost:8080/api/payment/create-order?amount=${plan.price}`,
            { method: "POST" }
        );

        const order = await orderResponse.json();

        // 2️⃣ Razorpay Options
        const options = {
            key: "rzp_test_SGWwdWaVUtSKqC", // your test key
            amount: order.amount,
            currency: "INR",
            name: "Recharge Portal",
            description: `${type} - ${plan.name || ""}`,
            order_id: order.id,

            handler: async function (response) {

                alert("Payment Successful ✅");
                
                // Optional: call backend to activate subscription
                await fetch("http://localhost:8080/api/subscription/fake", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: plan.name,
                        amount: plan.price,
                        paymentId: response.razorpay_payment_id,
                        status: "SUCCESS"
                    })
                });

                navigate("/");
            },

            prefill: {
                name: "User",
                email: "user@example.com"
            },

            theme: {
                color: "#0d9488"
            },

            modal: {
                ondismiss: () => setIsProcessing(false)
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (error) {
        console.error(error);
        alert("Payment Failed ❌");
        setIsProcessing(false);
    }
};





    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);

    // Extract payment details from state
    const { type, plan, details } = location.state || {};

    useEffect(() => {
        if (!location.state) {
            navigate("/"); // Redirect home if no state passed
        }
    }, [location, navigate]);

    if (!location.state) return null;

    const handlePayment = async () => {
        if (!token) {
            alert("Please login to proceed with payment");
            navigate("/login");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Create Order on Backend
            const orderRes = await fetch("http://localhost:8080/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: plan.price,
                    type: type,
                    details: details
                })
            });

            const orderData = await orderRes.json();

            if (!orderRes.ok) {
                throw new Error(orderData.message || "Failed to create order");
            }

            // 2. Open Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Recharge Portal",
                description: `${type} - ${plan.name || details.operator}`,
                order_id: orderData.orderId,
                handler: async (response) => {
                    // 3. Verify Payment on Backend
                    try {
                        const verifyRes = await fetch("http://localhost:8080/api/payment/verify-payment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok) {
                            alert("Payment Successful & Recharge Initiated! ✅");
                            navigate("/");
                        } else {
                            alert(verifyData.message || "Payment verification failed");
                        }
                    } catch (err) {
                        console.error("Verification Error:", err);
                        alert("Error verifying payment");
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: details?.mobileNumber || ""
                },
                theme: {
                    color: "#0d9488"
                },
                modal: {
                    ondismiss: () => setIsProcessing(false)
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment Initiation Error:", error);
            alert(error.message || "Error initiating payment");
            setIsProcessing(false);
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-container">
                <h2 className="payment-title">Secure Checkout</h2>

                {/* ORDER SUMMARY */}
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Type:</span>
                        <strong>{type}</strong>
                    </div>

                    {type === "Recharge" && details && (
                        <>
                            <div className="summary-row">
                                <span>Number:</span>
                                <strong>{details.mobileNumber || details.otherNumber}</strong>
                            </div>
                            <div className="summary-row">
                                <span>Operator:</span>
                                <strong>{details.operator}</strong>
                            </div>
                        </>
                    )}

                    {type === "Subscription" && plan && (
                        <div className="summary-row">
                            <span>Service:</span>
                            <strong>{plan.name}</strong>
                        </div>
                    )}

                    <div className="summary-row total">
                        <span>Total Amount:</span>
                        <span className="amount">
                            {type === "Recharge" ? `₹${plan?.price}` : plan?.price}
                        </span>
                    </div>
                </div>

                {/* PAYMENT METHOD */}
                <div className="payment-methods">
                    <h3>Select Payment Method</h3>

                    <label className={`method-card ${paymentMethod === "card" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        💳 Credit / Debit Card
                    </label>

                    <label className={`method-card ${paymentMethod === "upi" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="upi"
                            checked={paymentMethod === "upi"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        📲 UPI (GPay, PhonePe, Paytm)
                    </label>

                    <label className={`method-card ${paymentMethod === "netbanking" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="netbanking"
                            checked={paymentMethod === "netbanking"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        🏦 Net Banking
                    </label>
                </div>

                {/* PAY BUTTON */}
               <button
    className="pay-btn"
    onClick={handlePaymentSubscription}
    disabled={isProcessing}
>
    {isProcessing
        ? "Processing..."
        : `Pay ₹${plan?.price}`
    }
</button>


                <p className="secure-badge">🔒 100% Safe & Secure Payment</p>
            </div>
        </div>
    );
};

export default Payment;
