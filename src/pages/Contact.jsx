import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_c032ewy",     // 🔹 Replace with EmailJS Service ID
        "template_heuv639",    // 🔹 Replace with Template ID
        form.current,
        "INeaaPf85rD6fcHgH"      // 🔹 Replace with Public Key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message. Try again.");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-page">
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
          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your name" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
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
