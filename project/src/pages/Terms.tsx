import React from 'react';
import { motion } from 'framer-motion';

export function Terms() {
  return (
    <div className="flex-1 pt-32 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="legal-content"
        >
          <h1>Terms of Service</h1>
          <div className="metadata">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="section">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using InstantAnalytics, you agree to be bound by these Terms of Service and our Privacy Policy.
              If you disagree with any part of the terms, you may not access the service.
            </p>
          </div>

          <div className="section">
            <h2>2. Description of Service</h2>
            <p>
              InstantAnalytics provides email analytics services for Instantly users, including but not limited to:
            </p>
            <ul>
              <li>Email campaign analytics and tracking</li>
              <li>Performance monitoring and insights</li>
              <li>Client management portal</li>
              <li>Advanced reporting tools</li>
              <li>Domain and provider analytics</li>
            </ul>
          </div>

          <div className="section">
            <h2>3. Account Terms</h2>
            <ul>
              <li>You must provide accurate and complete information during registration</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must not share your account credentials with any third party</li>
              <li>You must notify us immediately of any unauthorized access or security breaches</li>
              <li>You are responsible for all activities that occur under your account</li>
            </ul>
          </div>

          <div className="section">
            <h2>4. Payment Terms</h2>
            <ul>
              <li>Subscription fee of $87/month after the 5-day trial period</li>
              <li>All payments are processed securely through Stripe</li>
              <li>Subscriptions renew automatically unless cancelled</li>
              <li>No refunds are provided for partial months of service</li>
              <li>Pricing may be subject to change with notice</li>
            </ul>
          </div>

          <div className="section">
            <h2>5. Free Trial</h2>
            <p>
              We offer a 5-day free trial of our service. No credit card is required during the trial period.
              After the trial ends, you must subscribe to continue using the service. All features are available
              during the trial period.
            </p>
          </div>

          <div className="section">
            <h2>6. Cancellation and Termination</h2>
            <ul>
              <li>You may cancel your subscription at any time through your account settings</li>
              <li>Access continues until the end of your current billing period</li>
              <li>We reserve the right to terminate accounts for terms violations</li>
              <li>Upon termination, your data may be permanently deleted</li>
            </ul>
          </div>

          <div className="section">
            <h2>7. Data Usage and Privacy</h2>
            <p>
              Your use of InstantAnalytics is also governed by our Privacy Policy.
              We collect and process data as described in the Privacy Policy.
              By using our service, you consent to such processing.
            </p>
          </div>

          <div className="section">
            <h2>8. Limitations of Liability</h2>
            <p>
              InstantAnalytics is provided "as is" without warranties of any kind, either express or implied.
              We are not liable for any damages arising from your use of our service. This includes but is not
              limited to direct, indirect, incidental, punitive, and consequential damages.
            </p>
          </div>

          <div className="section">
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any significant
              changes via email. Your continued use of InstantAnalytics after such modifications constitutes
              your acceptance of the updated terms.
            </p>
          </div>

          <div className="section">
            <h2>10. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
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