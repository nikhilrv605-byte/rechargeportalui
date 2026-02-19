import { useNavigate } from "react-router-dom";
import "./OttSection.css";

import netflixLogo from "../assets/netflix.png";
import primeLogo from "../assets/amazon-prime.png";
import hotstarLogo from "../assets/jiohotstar.png";
import sonyLogo from "../assets/sony-liv.png";
import zee5Logo from "../assets/zee5.png";
import mxLogo from "../assets/mx-player.png";
import spotifyLogo from "../assets/spotify.png";
import youtubeLogo from "../assets/youtube.png";

const OttSection = () => {
  const navigate = useNavigate();

  return (
    <section className="ott-section">
      <h2 className="ott-title">Popular OTT & Music Subscriptions</h2>
      <p className="ott-subtitle">
        Watch, listen & enjoy premium content instantly
      </p>

      <div className="ott-grid">
        <OttCard logo={netflixLogo} name="Netflix" desc="Movies & TV Shows" />
        <OttCard logo={primeLogo} name="Amazon Prime" desc="Movies + Delivery" />
        <OttCard logo={hotstarLogo} name="Jio Hotstar" desc="Sports & Movies" />
        <OttCard logo={sonyLogo} name="Sony LIV" desc="Live TV & Originals" />
        <OttCard logo={zee5Logo} name="ZEE5" desc="Indian Originals" />
        <OttCard logo={mxLogo} name="MX Player" desc="Free & Premium Shows" />
        <OttCard logo={spotifyLogo} name="Spotify" desc="Music Streaming" />
        <OttCard logo={youtubeLogo} name="YouTube" desc="Ad-free & Background Play" />
      </div>

      {/* CTA */}
      <div className="ott-cta">
        <button onClick={() => navigate("/subscription")}>
          View All Subscriptions →
        </button>
      </div>
    </section>
  );
};

const OttCard = ({ logo, name, desc }) => {
  const navigate = useNavigate();

  return (
    <div
      className="ott-card"
      onClick={() => navigate("/subscription")}
      style={{ cursor: "pointer" }}
    >
      <img src={logo} alt={name} className="ott-logo" />
      <h4>{name}</h4>
      <p>{desc}</p>
    </div>
  );
};

export default OttSection;
