import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <h2 className="why-title">Why Choose OnlineRecharge?</h2>
      <p className="why-subtitle">
        Fast, secure & reliable recharge experience
      </p>

      <div className="why-grid">
        <div className="why-card">
          ⚡
          <h4>Instant Recharge</h4>
          <p>Recharge completes in seconds without delays.</p>
        </div>

        <div className="why-card">
          🔐
          <h4>100% Secure</h4>
          <p>End-to-end encrypted & safe payments.</p>
        </div>

        <div className="why-card">
          🎯
          <h4>Best Offers</h4>
          <p>Cashbacks & exclusive deals every time.</p>
        </div>

        <div className="why-card">
          ☎️
          <h4>24/7 Support</h4>
          <p>Always here to help you anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
