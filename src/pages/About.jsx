import React from "react";
import {
  ShieldCheck,
  Layers,
  Zap,
  Code2,
  GraduationCap,
} from "lucide-react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About RechargePortal</h1>
          <p>
            A modern, secure, and user-friendly platform designed to simplify
            digital recharges and subscription management.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="about-content">
        <div className="about-card">
          <Layers className="about-icon" />
          <h2>Who We Are</h2>
          <p>
            RechargePortal is an <strong>Online Recharge and Subscription Portal</strong>{" "}
            that brings mobile, DTH, broadband, FASTag, and OTT services together
            into a single seamless experience.
          </p>
        </div>

        <div className="about-card">
          <Zap className="about-icon" />
          <h2>Our Objective</h2>
          <p>
            The goal of this project is to build a real-world styled payment
            application that demonstrates scalable UI design, clean component
            architecture, and smooth user workflows.
          </p>
        </div>

        <div className="about-card">
          <ShieldCheck className="about-icon" />
          <h2>Key Features</h2>
          <ul>
            <li>Instant prepaid & postpaid recharges</li>
            <li>DTH, broadband & FASTag services</li>
            <li>Subscription & OTT plan management</li>
            <li>Secure authentication flow</li>
            <li>Light & dark theme support</li>
            <li>Fully responsive UI</li>
          </ul>
        </div>

        <div className="about-card">
          <Code2 className="about-icon" />
          <h2>Technology Stack</h2>
          <ul className="tech-list">
            <li>React.js (Frontend)</li>
            <li>React Router</li>
            <li>Context API (Theme handling)</li>
            <li>Modern CSS (Dark mode & animations)</li>
          </ul>
        </div>

        <div className="about-card highlight">
          <GraduationCap className="about-icon large" />
          <h2>Academic Purpose</h2>
          <p>
            This project is developed as part of the{" "}
            <strong>TYBSc-IT curriculum</strong>, focusing on practical exposure
            to modern web development, UI/UX best practices, and real-world
            product thinking.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
