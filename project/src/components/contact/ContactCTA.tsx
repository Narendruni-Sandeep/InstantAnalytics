import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-card border border-border"
          >
            <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto mb-6">
              <Mail className="w-6 h-6 text-primary" />
            </div>

            <h2 className="text-2xl font-display font-bold mb-4">
              Need immediate assistance?
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 to help you with any questions.
            </p>

            <a
              href="mailto:support@instantanalytics.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Email Support
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}