import React from 'react';
import { motion } from 'framer-motion';

export function PrivacyPolicy() {
  return (
    <div className="flex-1 pt-32 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="legal-content"
        >
          <h1>Privacy Policy</h1>
          <div className="metadata">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="section">
            <h2>1. Introduction</h2>
            <p>
              InstantAnalytics ("we," "our," or "us"), located in Visakhapatnam, India, is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our email analytics service.
            </p>
          </div>

          <div className="section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li>Account information (name, email, password)</li>
              <li>Billing information (processed securely through Stripe)</li>
              <li>Instantly account credentials</li>
              <li>Company information</li>
            </ul>

            <h3>2.2 Information We Automatically Collect</h3>
            <ul>
              <li>Email campaign analytics data</li>
              <li>Usage statistics</li>
              <li>Log data and device information</li>
            </ul>
          </div>

          <div className="section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul>
              <li>Providing email analytics services</li>
              <li>Processing payments</li>
              <li>Improving our services</li>
              <li>Customer support</li>
              <li>Communication about service updates</li>
            </ul>
          </div>

          <div className="section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your data. However, no method of transmission over the internet is 100% secure.
              We use industry-standard encryption and security protocols.
            </p>
          </div>

          <div className="section">
            <h2>5. Third-Party Services</h2>
            <p>We work with the following third-party services:</p>
            <ul>
              <li>Stripe for payment processing</li>
              <li>Instantly for email campaign data</li>
            </ul>
          </div>

          <div className="section">
            <h2>6. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as needed to provide services.
              You can request data deletion by contacting our support team.
            </p>
          </div>

          <div className="section">
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request data deletion</li>
              <li>Object to data processing</li>
              <li>Export your data</li>
            </ul>
          </div>

          <div className="section">
            <h2>8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: <a href="mailto:support@instantanalytics.com">support@instantanalytics.com</a>
              <br />
              Address: Visakhapatnam, India
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}