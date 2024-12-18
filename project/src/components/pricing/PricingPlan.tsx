import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  'Real-time email campaign analytics',
  'Unlimited email tracking',
  'Client management portal',
  'Domain & provider analytics',
  'Advanced reporting',
  'Email sequence analytics',
  'Campaign performance insights',
  'Priority support',
];

export function PricingPlan() {
  return (
    <section className="py-16 bg-background relative">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="rounded-2xl bg-card border border-border p-8 relative">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                Most Popular
              </div>
            </div>

            {/* Plan details */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-bold mb-4">
                Professional Plan
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-display font-bold">$87</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">
                Everything you need to track and analyze your email campaigns
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-1 rounded-full bg-primary/10">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA button */}
            <Link
              to="/signup"
              className="block w-full text-center px-8 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <span className="flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}