import React from "react";
import "./Contact.css";

const Contact = () => {

  return (
    <div className="contact-page">
      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Need help with recharges or payments?  
            Our support team is always ready to assist you.
          </p>
        </div>

        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Get in Touch</h3>

            <div className="info-item">
              <span>📧</span>
              <div>
                <strong>Email</strong>
                <p>support@rechargeportal.com</p>
              </div>
            </div>

            <div className="info-item">
              <span>📞</span>
              <div>
                <strong>Phone</strong>
                <p>+91 80972 60036</p>
              </div>
            </div>

            <div className="info-item">
              <span>📍</span>
              <div>
                <strong>Location</strong>
                <p>Mumbai, India</p>
              </div>
            </div>

            <div className="info-item">
              <span>⏰</span>
              <div>
                <strong>Support Hours</strong>
                <p>Mon – Sat (9 AM – 9 PM)</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                placeholder="Write your message here..."
                rows="4"
                required
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
