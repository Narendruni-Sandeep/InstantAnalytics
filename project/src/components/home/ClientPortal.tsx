import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, FileText, BarChart2 } from 'lucide-react';

const metrics = [
  {
    icon: Users,
    label: 'Client Management',
    value: '1-Click',
    description: 'Map emails and campaigns to clients instantly'
  },
  {
    icon: Mail,
    label: 'Email Tracking',
    value: 'Real-time',
    description: 'Monitor email performance as it happens'
  },
  {
    icon: FileText,
    label: 'Campaign Reports',
    value: 'Automated',
    description: 'Generate beautiful reports automatically'
  },
  {
    icon: BarChart2,
    label: 'Analytics',
    value: 'Instant',
    description: 'Get insights without manual work'
  }
];

export function ClientPortal() {
  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Powerful Client Portal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Organize your email campaigns by client and get detailed analytics for each one
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-display font-semibold">
                  {metric.label}
                </h3>
                <p className="text-3xl font-display font-bold text-primary">
                  {metric.value}
                </p>
                <p className="text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}