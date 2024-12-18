import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Linkedin, Mail } from 'lucide-react';

export function ContactOptions() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Calendar Booking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-6">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="text-xl font-display font-semibold mb-4">
              Schedule a Call
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Book a 30-minute call with our team to discuss how InstantAnalytics can help your business.
            </p>

            <a
              href="https://cal.com/your-calendar-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book a Meeting
            </a>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <div className="p-3 rounded-lg bg-[#0077b5]/10 w-fit mb-6">
              <Linkedin className="w-6 h-6 text-[#0077b5]" />
            </div>
            
            <h3 className="text-xl font-display font-semibold mb-4">
              Connect on LinkedIn
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Follow us on LinkedIn for updates and connect with our team.
            </p>

            <a
              href="https://www.linkedin.com/in/11pranav-garg/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0077b5] text-white hover:bg-[#0077b5]/90 transition-colors"
            >
              View Profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}