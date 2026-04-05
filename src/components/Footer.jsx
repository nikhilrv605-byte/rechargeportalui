import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/rechargelogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src={logo}
            alt="Recharge Portal"
            className="logoR"
          />
          <p>
            Fast, secure & seamless recharge and subscription platform.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Services</h4>
            <Link to="/recharge" state={{ tab: "Mobile" }}>Mobile Recharge</Link>
            <Link to="/recharge" state={{ tab: "DTH" }}>DTH</Link>
            <Link to="/recharge" state={{ tab: "Broadband" }}>Broadband</Link>
            <Link to="/subscription">OTT</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Support</h4>
            <Link to="/contact">Help Center</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 RechargePortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
