import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, LineChart, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* Floating charts background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[BarChart2, LineChart, PieChart].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [-50, 0, 50],
              x: Math.sin(index * Math.PI / 2) * 20
            }}
            transition={{
              duration: 3,
              delay: index * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute"
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + (index % 2) * 40}%`
            }}
          >
            <Icon className="w-8 h-8 text-primary/50" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Transform Your Email Analytics
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Unlock the Power
            </span>
            <br />
            <span className="text-foreground">
              of Your Email Data
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Get real-time insights, beautiful visualizations, and actionable analytics 
            for your email campaigns. Start making data-driven decisions today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              >
                View Pricing
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}