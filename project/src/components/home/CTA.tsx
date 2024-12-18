import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
      
      {/* Gradient blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Ready to transform your email analytics?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Start your 5-day free trial today. No credit card required.
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