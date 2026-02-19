import React from "react";
import { FileText, CheckCircle, AlertCircle, ShieldAlert, Scale } from "lucide-react";
import "./TermsOfUse.css";

const TermsOfUse = () => {
    return (
        <div className="terms-page">
            <section className="terms-hero">
                <div className="terms-hero-content">
                    <h1>Terms of Use</h1>
                    <p>Last Updated: February 18, 2026</p>
                    <p>
                        Please read these terms carefully before using our services. By using
                        RechargePortal, you agree to comply with these terms.
                    </p>
                </div>
            </section>

            <section className="terms-content">
                <div className="terms-card">
                    <CheckCircle className="terms-icon" />
                    <h2>Acceptance of Terms</h2>
                    <p>
                        By accessing or using the RechargePortal platform, you acknowledge
                        that you have read, understood, and agree to be bound by these Terms
                        of Use and our Privacy Policy.
                    </p>
                </div>

                <div className="terms-card">
                    <FileText className="terms-icon" />
                    <h2>User Obligations</h2>
                    <p>
                        As a user of our platform, you agree to:
                    </p>
                    <ul>
                        <li>Provide accurate and complete information</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Not use the service for any illegal or unauthorized purpose</li>
                        <li>Not interfere with the proper working of the platform</li>
                    </ul>
                </div>

                <div className="terms-card">
                    <AlertCircle className="terms-icon" />
                    <h2>Prohibited Activities</h2>
                    <p>
                        Users are strictly prohibited from engaging in activities that:
                    </p>
                    <ul>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Use automated scripts to collect data from the platform</li>
                        <li>Transmit any viruses or malicious code</li>
                        <li>Impersonate any person or entity</li>
                    </ul>
                </div>

                <div className="terms-card">
                    <ShieldAlert className="terms-icon" />
                    <h2>Limitation of Liability</h2>
                    <p>
                        RechargePortal shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages resulting from your use
                        or inability to use the service.
                    </p>
                </div>

                <div className="terms-card highlight">
                    <Scale className="terms-icon large" />
                    <h2>Governing Law</h2>
                    <p>
                        These terms shall be governed by and construed in accordance with the
                        laws of the jurisdiction in which RechargePortal operates, without
                        regard to its conflict of law provisions.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TermsOfUse;
