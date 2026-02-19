import { useNavigate } from "react-router-dom";
import "./Subscription.css";

import netflixLogo from "../assets/netflix.png";
import primeLogo from "../assets/amazon-prime.png";
import hotstarLogo from "../assets/jiohotstar.png";
import sonyLogo from "../assets/sony-liv.png";
import zee5Logo from "../assets/zee5.png";
import mxLogo from "../assets/mx-player.png";
import youtubeLogo from "../assets/youtube.png";
import spotifyLogo from "../assets/spotify.png";
import appleMusicLogo from "../assets/apple.png";
import jioSaavnLogo from "../assets/jiosavan.png";
import wynkLogo from "../assets/wynkmusic.png";
import gaanaLogo from "../assets/gaana.png";

const Subscription = () => {

  const handleSubscriptionPayment = async (name, price) => {

    if (price === 0) {
      alert("This plan is Free 🎉");
      return;
    }

    try {
      // 1️⃣ Create Order
      const orderResponse = await fetch(
        `http://localhost:8080/api/payment/create-order?amount=${price}`,
        { method: "POST" }
      );

      const order = await orderResponse.json();

      // 2️⃣ Razorpay Options
      const options = {
        key: "rzp_test_SGWwdWaVUtSKqC",
        amount: order.amount,
        currency: "INR",
        name: "Recharge Portal",
        description: `${name} Subscription`,
        order_id: order.id,

        handler: async function (response) {

          // 3️⃣ Call Backend Fake Subscription API
          await fetch("http://localhost:8080/api/subscription/fake", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subscriptionName: name,
              amount: price,
              paymentId: response.razorpay_payment_id,
              status: "SUCCESS"
            }),
          });

          alert(`${name} Subscription Activated ✅`);
        },

        theme: {
          color: "#635bff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment Failed ❌");
    }
  };



  const navigate = useNavigate();

  const handleSubscribe = (name, price) => {
    navigate("/payment", {
      state: {
        type: "Subscription",
        plan: { name, price },
      },
    });
  };

  return (
    <section className="subscription-page">
      <div className="subscription-header">
        <h1>Subscriptions</h1>
        <p>Choose a plan and start enjoying premium content</p>
      </div>

      <div className="subscription-grid">
        {/* Netflix */}
        <div className="subscription-card netflix">
          <img src={netflixLogo} alt="Netflix" />
          <h3>Netflix</h3>
          <ul>
            <li>Unlimited movies & shows</li>
            <li>Watch on any device</li>
            <li>HD / 4K available</li>
          </ul>
          <div className="price">Starting at ₹149/month</div>
          <button
            className="subscribe-btn"
            onClick={() => handleSubscriptionPayment("Netflix", 149)}
          >
            Subscribe
          </button>

        </div>

        {/* Prime */}
        <div className="subscription-card prime">
          <img src={primeLogo} alt="Amazon Prime" />
          <h3>Amazon Prime</h3>
          <ul>
            <li>Movies & web series</li>
            <li>Free & fast delivery</li>
            <li>Prime Music included</li>
          </ul>
          <div className="price">₹299/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscriptionPayment("Amazon Prime", 299)}>Subscribe</button>
        </div>

        {/* Hotstar */}
        <div className="subscription-card hotstar">
          <img src={hotstarLogo} alt="Jio Hotstar" />
          <h3>Jio Hotstar</h3>
          <ul>
            <li>Live sports</li>
            <li>Movies & TV shows</li>
            <li>Kids content</li>
          </ul>
          <div className="price">Starting at ₹149/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("Jio Hotstar", 149)}>Subscribe</button>
        </div>

        {/* Sony LIV */}
        <div className="subscription-card sony">
          <img src={sonyLogo} alt="Sony LIV" />
          <h3>Sony LIV</h3>
          <ul>
            <li>Live TV</li>
            <li>Sony originals</li>
            <li>Sports streaming</li>
          </ul>
          <div className="price">Starting at ₹199/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("Sony LIV", 199)}>Subscribe</button>
        </div>

        {/* ZEE5 */}
        <div className="subscription-card zee5">
          <img src={zee5Logo} alt="ZEE5" />
          <h3>ZEE5</h3>
          <ul>
            <li>Indian originals</li>
            <li>Movies & TV shows</li>
            <li>Multiple languages</li>
          </ul>
          <div className="price">Starting at ₹99/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("ZEE5", 99)}>Subscribe</button>
        </div>

        {/* MX Player */}
        <div className="subscription-card mxplayer">
          <img src={mxLogo} alt="MX Player" />
          <h3>MX Player</h3>
          <ul>
            <li>Free & premium shows</li>
            <li>Web series</li>
            <li>Multiple genres</li>
          </ul>
          <div className="price">Free / Premium plans</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("MX Player", 0)}>Subscribe</button>
        </div>

        {/* YouTube */}
        <div className="subscription-card youtube">
          <img src={youtubeLogo} alt="YouTube Premium" />
          <h3>YouTube Premium</h3>
          <ul>
            <li>Ad-free videos</li>
            <li>Background play</li>
            <li>YouTube Music included</li>
          </ul>
          <div className="price">₹129/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("YouTube Premium", 129)}>Subscribe</button>
        </div>

        {/* Spotify */}
        <div className="subscription-card spotify">
          <img src={spotifyLogo} alt="Spotify" />
          <h3>Spotify</h3>
          <ul>
            <li>Ad-free music</li>
            <li>Offline downloads</li>
            <li>High quality audio</li>
          </ul>
          <div className="price">₹119/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("Spotify", 119)}>Subscribe</button>
        </div>

        {/* Apple Music */}
        <div className="subscription-card apple">
          <img src={appleMusicLogo} alt="Apple Music" />
          <h3>Apple Music</h3>
          <ul>
            <li>Lossless audio</li>
            <li>Offline listening</li>
            <li>Apple ecosystem support</li>
          </ul>
          <div className="price">₹99/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("Apple Music", 99)}>Subscribe</button>
        </div>

        {/* Jio Saavn */}
        <div className="subscription-card jiosaavn">
          <img src={jioSaavnLogo} alt="Jio Saavn" />
          <h3>Jio Saavn</h3>
          <ul>
            <li>Millions of songs</li>
            <li>Exclusive podcasts</li>
            <li>JioTunes included</li>
          </ul>
          <div className="price">₹99/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("Jio Saavn", 99)}>Subscribe</button>
        </div>

        {/* Wynk Music */}
        <div className="subscription-card wynk">
          <img src={wynkLogo} alt="Wynk Music" />
          <h3>Wynk Music</h3>
          <ul>
            <li>Unlimited music downloads</li>
            <li>HelloTunes for Airtel</li>
            <li>High definition music</li>
          </ul>
          <div className="price">₹99/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("Wynk Music", 99)}>Subscribe</button>
        </div>

        {/* Gaana */}
        <div className="subscription-card gaana">
          <img src={gaanaLogo} alt="Gaana" />
          <h3>Gaana</h3>
          <ul>
            <li>Popular Bollywood hits</li>
            <li>Expertly curated playlists</li>
            <li>Ad-free experience</li>
          </ul>
          <div className="price">₹99/month</div>
          <button className="subscribe-btn" onClick={() => handleSubscribe("Gaana", 99)}>Subscribe</button>
        </div>

      </div>
    </section>
  );
};

export default Subscription;
