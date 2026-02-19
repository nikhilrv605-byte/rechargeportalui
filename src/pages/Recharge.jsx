import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Recharge.css";
const mobilePlansByOperator = {
  Airtel: {
    Prepaid: [
      { price: 19, validity: "1 Day", data: "1GB", calls: "Data Only", small: true },
      { price: 99, validity: "7 Days", data: "200MB/day", calls: "Unlimited Calls" },
      { price: 199, validity: "28 Days", data: "1.5GB/day", calls: "Unlimited Calls" },
      { price: 239, validity: "28 Days", data: "1.5GB/day", calls: "Unlimited Calls", popular: true },
      { price: 299, validity: "28 Days", data: "2GB/day", calls: "Unlimited Calls" },
      { price: 666, validity: "84 Days", data: "1.5GB/day", calls: "Unlimited Calls" },
      { price: 999, validity: "84 Days", data: "2.5GB/day", calls: "Unlimited Calls + OTT" },
    ],
    Postpaid: [
      { price: 399, validity: "30 Days", data: "10GB", calls: "Unlimited Calls", popular: true },
      { price: 599, validity: "30 Days", data: "20GB", calls: "Unlimited Calls" },
      { price: 999, validity: "30 Days", data: "50GB", calls: "Family Plan + OTT" },
    ],
  },
  Jio: {
    Prepaid: [
      { price: 16, validity: "1 Day", data: "1GB", calls: "Data Only", small: true },
      { price: 29, validity: "1 Day", data: "2GB", calls: "Data Only", small: true },
      { price: 149, validity: "20 Days", data: "1GB/day", calls: "Unlimited Calls" },
      { price: 209, validity: "28 Days", data: "1GB/day", calls: "Unlimited Calls" },
      { price: 299, validity: "28 Days", data: "2GB/day", calls: "Unlimited Calls", popular: true },
      { price: 749, validity: "90 Days", data: "2GB/day", calls: "Unlimited Calls" },
    ],
    Postpaid: [
      { price: 499, validity: "30 Days", data: "15GB", calls: "Unlimited Calls" },
      { price: 699, validity: "30 Days", data: "25GB", calls: "Unlimited Calls", popular: true },
      { price: 999, validity: "30 Days", data: "75GB", calls: "Family Plan" },
    ],
  },
  Vi: {
    Prepaid: [
      { price: 99, validity: "14 Days", data: "200MB/day", calls: "Unlimited Calls" },
      { price: 199, validity: "28 Days", data: "1.5GB/day", calls: "Unlimited Calls" },
      { price: 299, validity: "28 Days", data: "2GB/day", calls: "Unlimited Calls", popular: true },
      { price: 719, validity: "84 Days", data: "1.5GB/day", calls: "Unlimited Calls" },
    ],
    Postpaid: [
      { price: 399, validity: "30 Days", data: "12GB", calls: "Unlimited Calls" },
      { price: 599, validity: "30 Days", data: "24GB", calls: "Unlimited Calls", popular: true },
    ],
  },
  BSNL: {
    Prepaid: [
      { price: 97, validity: "18 Days", data: "2GB/day", calls: "Unlimited Calls" },
      { price: 199, validity: "30 Days", data: "2GB/day", calls: "Unlimited Calls" },
      { price: 397, validity: "54 Days", data: "2GB/day", calls: "Unlimited Calls", popular: true },
    ],
    Postpaid: [
      { price: 299, validity: "30 Days", data: "10GB", calls: "Unlimited Calls" },
      { price: 525, validity: "30 Days", data: "40GB", calls: "Unlimited Calls" },
    ],
  },
};


/* ================= DTH ================= */
const dthPlansByOperator = {
  "Tata Play": [
    { price: 153, validity: "30 Days", data: "100+ Channels", calls: "Basic Pack" },
    { price: 220, validity: "30 Days", data: "Movies & Entertainment", calls: "Popular Pack", popular: true },
    { price: 349, validity: "30 Days", data: "HD Channels", calls: "HD Pack" },
    { price: 450, validity: "30 Days", data: "All Channels", calls: "Premium Pack" },
  ],

  "Dish TV": [
    { price: 199, validity: "30 Days", data: "SD Channels", calls: "Value Pack" },
    { price: 299, validity: "30 Days", data: "HD Channels", calls: "HD Pack", popular: true },
    { price: 499, validity: "30 Days", data: "Sports + Movies", calls: "Premium" },
  ],

  d2h: [
    { price: 180, validity: "30 Days", data: "Family Pack", calls: "Basic" },
    { price: 349, validity: "30 Days", data: "HD Pack", calls: "Popular", popular: true },
    { price: 550, validity: "30 Days", data: "All Channels", calls: "Ultimate" },
  ],
};


/* ================= BROADBAND ================= */
const broadbandPlansByOperator = {
  "JioFiber": [
    { price: 399, validity: "30 Days", data: "40 Mbps", calls: "Unlimited Data" },
    { price: 699, validity: "30 Days", data: "100 Mbps", calls: "OTT Included", popular: true },
    { price: 999, validity: "30 Days", data: "150 Mbps", calls: "OTT + TV" },
    { price: 1499, validity: "30 Days", data: "300 Mbps", calls: "Premium OTT" },
  ],

  "Airtel Xstream Fiber": [
    { price: 499, validity: "30 Days", data: "100 Mbps", calls: "Unlimited Data", popular: true },
    { price: 799, validity: "30 Days", data: "200 Mbps", calls: "OTT Included" },
    { price: 1499, validity: "30 Days", data: "300 Mbps", calls: "Premium OTT" },
  ],

  "ACT Fibernet": [
    { price: 549, validity: "30 Days", data: "150 Mbps", calls: "Unlimited Data", popular: true },
    { price: 999, validity: "30 Days", data: "300 Mbps", calls: "OTT Bundle" },
  ],

  "BSNL Bharat Fiber": [
    { price: 399, validity: "30 Days", data: "60 Mbps", calls: "Unlimited Data" },
    { price: 699, validity: "30 Days", data: "100 Mbps", calls: "Unlimited Data" },
  ],
};


/* ================= FASTAG ================= */
const fastagPlans = [
  { price: 200, validity: "Top-up", data: "Minimum Balance", calls: "FASTag Wallet" },
  { price: 300, validity: "Top-up", data: "Daily Commute", calls: "FASTag Wallet" },
  { price: 500, validity: "Top-up", data: "Recommended", calls: "FASTag Wallet", popular: true },
  { price: 1000, validity: "Top-up", data: "Frequent Travel", calls: "FASTag Wallet" },
  { price: 2000, validity: "Top-up", data: "Long Distance Travel", calls: "FASTag Wallet" },
];

const Recharge = () => {

const handleMobileRecharge = async () => {
  if (!selectedPlan || activeTab !== "Mobile") return;

  try {
    // 1️⃣ Create Order from backend
    const orderResponse = await fetch(
      `http://localhost:8080/api/payment/create-order?amount=${selectedPlan.price}`,
      { method: "POST" }
    );

    const order = await orderResponse.json();

    // 2️⃣ Razorpay Options
    const options = {
      key: "rzp_test_SGWwdWaVUtSKqC", // 🔥 replace
      amount: order.amount,
      currency: "INR",
      name: "Recharge Portal",
      description: "Mobile Recharge",
      order_id: order.id,
      handler: async function (response) {

        // 3️⃣ Call Fake Recharge API
        const rechargeResponse = await fetch(
          "http://localhost:8080/api/recharge/fake",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mobileNumber,
              operator,
              amount: selectedPlan.price,
              paymentId: response.razorpay_payment_id,
              status: "SUCCESS",
            }),
          }
        );

        const data = await rechargeResponse.json();

        alert("Recharge Successful ✅");

        // Reset form
        setSelectedPlan(null);
        setMobileNumber("");
        setOperator("");
      },
      prefill: {
        contact: mobileNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Payment Failed ❌");
  }
};



  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Mobile");
  const [operator, setOperator] = useState("");
  const [mobileType, setMobileType] = useState("Prepaid");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [mobileNumber, setMobileNumber] = useState("");
  const [otherNumber, setOtherNumber] = useState("");
  const [error, setError] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (location.state) {
      if (location.state.tab) {
        setActiveTab(location.state.tab);
      }
      if (location.state.type && location.state.tab === "Mobile") {
        setMobileType(location.state.type);
      }
      // Clean up inputs on tab switch via nav
      setOperator("");
      setSelectedPlan(null);
      setMobileNumber("");
      setOtherNumber("");
      setError("");
    }
  }, [location.state]);

  /* ================= VALIDATION ================= */

  const validateMobile = (value) => {
    if (value.length !== 10) return "Mobile number must be 10 digits";
    if (!/^[6-9]/.test(value)) return "Must start with 6-9";
    return "";
  };

  const validateOther = (value) => {
    if (!value) return "This field is required";

    if (activeTab === "DTH") {
      if (!/^[0-9]{10,15}$/.test(value)) return "Invalid Subscriber / VC Number";
    }

    if (activeTab === "Broadband") {
      if (value.length < 6) return "Account ID must be at least 6 characters";
    }

    if (activeTab === "FASTag") {
      const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
      const numericRegex = /^[0-9]{10,16}$/;
      if (!vehicleRegex.test(value) && !numericRegex.test(value)) {
        return "Invalid FASTag ID / Vehicle Number";
      }
    }

    return "";
  };

  /* ================= PLANS ================= */

  const getPlans = () => {
    if (activeTab === "Mobile" && operator) {
      return mobilePlansByOperator[operator]?.[mobileType] || [];
    }
    if (activeTab === "DTH" && operator) {
      return dthPlansByOperator[operator] || [];
    }
    if (activeTab === "Broadband" && operator) {
      return broadbandPlansByOperator[operator] || [];
    }
    if (activeTab === "FASTag") return fastagPlans;
    return [];
  };

  return (
    <div className="recharge-page">
      <h2 className="recharge-title">Quick Recharge</h2>

      {/* ================= TABS ================= */}
      <div className="recharge-tabs">
        {["Mobile", "DTH", "Broadband", "FASTag"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              setActiveTab(tab);
              setOperator("");
              setSelectedPlan(null);
              setMobileNumber("");
              setOtherNumber("");
              setError("");
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="recharge-card">

        {/* ================= LEFT ================= */}
        <div className="recharge-left">

          {activeTab === "Mobile" && (
            <div className="mobile-toggle">
              {["Prepaid", "Postpaid"].map((type) => (
                <button
                  key={type}
                  className={mobileType === type ? "active" : ""}
                  onClick={() => {
                    setMobileType(type);
                    setSelectedPlan(null);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {/* ================= INPUT ================= */}
          <div className="form-group">
            <label>
              {activeTab === "Mobile"
                ? "Mobile Number"
                : activeTab === "DTH"
                  ? "Subscriber / VC Number"
                  : activeTab === "Broadband"
                    ? "Account ID / User ID"
                    : "Vehicle No / FASTag ID"}
            </label>

            <input
              type="text"
              placeholder={
                activeTab === "Mobile"
                  ? "Enter 10-digit mobile number"
                  : activeTab === "FASTag"
                    ? "Vehicle No / Subscriber ID"
                    : "Enter number"
              }
              maxLength={activeTab === "Mobile" ? 10 : 20}
              value={activeTab === "Mobile" ? mobileNumber : otherNumber}
              onChange={(e) => {
                const value =
                  activeTab === "FASTag"
                    ? e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
                    : e.target.value.replace(/\s/g, "");

                if (activeTab === "Mobile") {
                  const digits = value.replace(/\D/g, "");
                  setMobileNumber(digits);
                  setError(validateMobile(digits));
                } else {
                  setOtherNumber(value);
                  setError(validateOther(value));
                }
              }}
            />

            {error && <span className="input-error">{error}</span>}
          </div>

          {/* ================= OPERATOR ================= */}
          <div className="form-group">
            <label>Operator</label>
            <select
              value={operator}
              onChange={(e) => {
                setOperator(e.target.value);
                setSelectedPlan(null);
              }}
            >
              <option value="">Select operator</option>

              {activeTab === "Mobile" &&
                Object.keys(mobilePlansByOperator).map((o) => (
                  <option key={o}>{o}</option>
                ))}

              {activeTab === "DTH" &&
                Object.keys(dthPlansByOperator).map((o) => (
                  <option key={o}>{o}</option>
                ))}

              {activeTab === "Broadband" &&
                Object.keys(broadbandPlansByOperator).map((o) => (
                  <option key={o}>{o}</option>
                ))}

              {activeTab === "FASTag" &&
                ["ICICI FASTag", "HDFC FASTag", "Axis FASTag", "Paytm FASTag"].map(
                  (o) => <option key={o}>{o}</option>
                )}
            </select>
          </div>

          {/* ================= AMOUNT ================= */}
          <div className="form-group">
            <label>Amount</label>
            <input
              readOnly
              value={selectedPlan ? `₹ ${selectedPlan.price}` : ""}
              placeholder="Select a plan"
            />
          </div>

          {!isLoggedIn && (
            <p className="login-warning">⚠ Please login to continue</p>
          )}

          <button
  className="recharge-btn"
  disabled={!selectedPlan || !!error || !isLoggedIn}
  onClick={() => {
    if (activeTab === "Mobile") {
      handleMobileRecharge();
    } else {
      alert("Recharge available only for Mobile (Demo Mode)");
    }
  }}
>
  {isLoggedIn ? "Recharge Now" : "Login to Recharge"}
</button>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="recharge-right">
          <h4>Available Plans</h4>

          <div className="plans-grid">
            {getPlans().map((plan) => (
              <div
                key={plan.price}
                className={`plan-card ${selectedPlan?.price === plan.price ? "selected" : ""
                  }`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.popular && <span className="badge">Popular</span>}
                <div className="plan-price">₹{plan.price}</div>
                <div className="plan-validity">{plan.validity}</div>
                <div className="plan-desc">
                  <span>{plan.data}</span>
                  <span>{plan.calls}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Recharge;
