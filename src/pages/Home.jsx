import { useNavigate } from "react-router-dom";
import RechargeCard from "../components/RechargeCard";
import WhyChooseUs from "../components/WhyChooseUs";
import OttSection from "../components/OttSection";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-background">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">🚀 Simple. Fast. Secure.</div>
          <h1>
            Recharge <span className="highlight-text">Instantly</span> & <br />
            Pay Bills <span className="highlight-text">Seamlessly</span>
          </h1>
          <p>
            The one-stop platform for Mobile, DTH, Broadband & OTT subscriptions.
            Experience the future of digital payments.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate("/register")}>
              Get Started
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/recharge")}
            >
              Recharge Now
            </button>
          </div>
        </div>
      </section>
      {/* 🔥 Floating Recharge Card */}
      <RechargeCard />
      <OttSection />
      <WhyChooseUs />

    </>
  );
};

export default Home;