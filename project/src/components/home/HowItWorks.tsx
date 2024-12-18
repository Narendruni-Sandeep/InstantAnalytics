import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Connect Your Account',
    description: 'Link your Instantly account securely to start tracking your email campaigns.'
  },
  {
    number: '02',
    title: 'Import Your Data',
    description: 'We automatically sync and organize your email campaign data.'
  },
  {
    number: '03',
    title: 'Monitor Performance',
    description: 'Track opens, replies, and bounces in real-time with our intuitive dashboard.'
  },
  {
    number: '04',
    title: 'Optimize & Scale',
    description: 'Use insights to improve your campaigns and scale your outreach.'
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
      
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Get started with InstantAnalytics in four simple steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-4 top-8 w-8 h-8 text-muted-foreground/30" />
              )}
              
              <div className="p-6 rounded-xl bg-card border border-border h-full">
                <div className="text-4xl font-display font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}