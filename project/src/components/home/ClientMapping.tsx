import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Mail, FileText } from 'lucide-react';

const mappingSteps = [
  {
    icon: Mail,
    title: 'Select Mailbox',
    description: 'Choose from your connected email accounts',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: ArrowRight,
    title: 'Map to Client',
    description: 'Assign emails to specific clients with one click',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: FileText,
    title: 'Track Campaigns',
    description: 'Monitor performance by client and campaign',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: Users,
    title: 'Client Reports',
    description: 'Generate client-specific analytics instantly',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10'
  }
];

export function ClientMapping() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Map & Track in Minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Organize your email campaigns by client with our intuitive mapping system
          </motion.p>
        </div>

        <div className="relative">
          {/* Connection lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mappingSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-4 px-2 py-1 rounded-md bg-card border border-border text-xs font-medium">
                  Step {index + 1}
                </div>

                <div className="p-6 rounded-xl bg-card border border-border h-full">
                  <div className={`p-3 rounded-lg ${step.bgColor} w-fit mb-4`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
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
      </div>
    </section>
  );
}