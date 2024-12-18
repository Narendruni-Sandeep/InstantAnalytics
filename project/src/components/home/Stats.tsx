import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, BarChart2 } from 'lucide-react';
import { AnimatedNumber } from '../dashboard/AnimatedNumber';

const stats = [
  {
    icon: Mail,
    value: 1000000,
    label: 'Emails Tracked',
    suffix: '+'
  },
  {
    icon: Users,
    value: 500,
    label: 'Happy Clients',
    suffix: '+'
  },
  {
    icon: BarChart2,
    value: 99.9,
    label: 'Uptime',
    suffix: '%'
  }
];

export function Stats() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-4xl font-display font-bold mb-2">
                <AnimatedNumber value={stat.value} />
                {stat.suffix}
              </div>
              <p className="text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}