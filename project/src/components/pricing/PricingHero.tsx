import React from 'react';
import { motion } from 'framer-motion';

export function PricingHero() {
  return (
    <section className="pt-32 pb-16 bg-background relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
      
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Start with a 5-day free trial. No credit card required.
            Cancel anytime.
          </motion.p>
        </div>
      </div>
    </section>
  );
}