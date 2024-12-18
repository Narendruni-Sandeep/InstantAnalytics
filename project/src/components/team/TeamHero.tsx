import React from 'react';
import { motion } from 'framer-motion';

export function TeamHero() {
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
            Meet Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            The passionate individuals behind InstantAnalytics working to transform your email analytics experience.
          </motion.p>
        </div>
      </div>
    </section>
  );
}