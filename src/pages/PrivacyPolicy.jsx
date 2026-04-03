import React from "react";
import { Shield, Lock, Eye, FileText, UserCheck } from "lucide-react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    return (
        <div className="privacy-page">
            <section className="privacy-hero">
                <div className="privacy-hero-content">
                    <h1>Privacy Policy</h1>
                    <p>Effective Date: February 18, 2026</p>
                    <p>
                        Your privacy is important to us. This policy explains how we collect,
                        use, and protect your personal information.
                    </p>
                </div>
            </section>

            <section className="privacy-content">
                <div className="privacy-card">
                    <FileText className="privacy-icon" />
                    <h2>Information We Collect</h2>
                    <p>
                        When you use RechargePortal, we collect information necessary to
                        provide our services, including:
                    </p>
                    <ul>
                        <li>Personal identifiers (name, email, phone number)</li>
                        <li>Transaction history and recharge details</li>
                        <li>Device information and IP address</li>
                    </ul>
                </div>

                <div className="privacy-card">
                    <Shield className="privacy-icon" />
                    <h2>How We Use Your Data</h2>
                    <p>
                        We use the collected information for various purposes, such as:
                    </p>
                    <ul>
                        <li>Processing your recharges and payments</li>
                        <li>Improving our services and user experience</li>
                        <li>Communicating with you about your account and offers</li>
                        <li>Ensuring the security and integrity of our platform</li>
                    </ul>
                </div>

                <div className="privacy-card">
                    <Lock className="privacy-icon" />
                    <h2>Data Security</h2>
                    <p>
                        We implement industry-standard security measures to protect your
                        data. All transactions are processed through secure gateways, and
                        your personal information is encrypted during transmission.
                    </p>
                </div>

                <div className="privacy-card">
                    <Eye className="privacy-icon" />
                    <h2>Third-Party Sharing</h2>
                    <p>
                        We do not sell your personal data to third parties. We may share
                        information with trusted service providers who assist us in
                        operating our platform, such as payment processors and network
                        operators.
                    </p>
                </div>

                <div className="privacy-card highlight">
                    <UserCheck className="privacy-icon large" />
                    <h2>Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal
                        information at any time. If you have any questions or requests
                        regarding your data, please contact our support team.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
