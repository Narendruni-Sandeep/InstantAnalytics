import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, Mail, Users, Globe, 
  Zap, Shield, LineChart, PieChart,
  Clock, Workflow, Layers, ArrowUpRight
} from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Save Hours of Work',
    description: 'Transform days of manual reporting into minutes. Our automated analytics dashboard gives you instant insights into your email campaign performance.'
  },
  {
    icon: Workflow,
    title: 'Client Management',
    description: 'Organize campaigns by client, track performance separately, and generate client-specific reports with our intuitive portal.'
  },
  {
    icon: BarChart2,
    title: 'Real-time Analytics',
    description: 'Monitor opens, replies, and bounces in real-time. Know exactly how your campaigns are performing at any moment.'
  },
  {
    icon: Globe,
    title: 'Domain Analytics',
    description: 'Analyze performance across different domains and email providers to optimize deliverability and improve campaign success.'
  },
  {
    icon: Layers,
    title: 'Sequence Analytics',
    description: 'Track performance across different email sequences and variants to identify your most effective messaging.'
  },
  {
    icon: ArrowUpRight,
    title: 'Conversion Tracking',
    description: 'Follow your leads from first contact to conversion with detailed funnel analytics and opportunity tracking.'
  }
];

export function Features() {
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
            Powerful Analytics Made Simple
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to understand and optimize your email campaigns
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}