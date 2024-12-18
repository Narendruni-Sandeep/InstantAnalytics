import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TeamCTA() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-6"
          >
            Join us on our mission
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Experience the power of InstantAnalytics with our dedicated team supporting you every step of the way.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              to="/pricing"
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}