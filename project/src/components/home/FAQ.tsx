import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is InstantAnalytics?',
    answer: 'InstantAnalytics is a powerful analytics dashboard that helps you track and analyze your Instantly email campaigns. It provides real-time monitoring, detailed statistics, and beautiful visualizations to help you optimize your email outreach.'
  },
  {
    question: 'How do I get started?',
    answer: 'Getting started is easy! Simply sign up for an account, connect your Instantly credentials, and you\'ll have access to your email analytics dashboard. We offer a 5-day free trial so you can explore all features.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, absolutely! We use enterprise-grade encryption to protect your data. We never store your email content - only metadata for analytics purposes. Your security is our top priority.'
  },
  {
    question: 'What kind of analytics do you provide?',
    answer: 'We provide comprehensive analytics including open rates, reply rates, bounce rates, domain performance, email provider statistics, and much more. All data is presented in real-time with beautiful, easy-to-understand visualizations.'
  },
  {
    question: 'Can I manage multiple clients?',
    answer: 'Yes! Our platform is designed for agencies and businesses managing multiple clients. You can organize campaigns by client, track performance separately, and generate client-specific reports.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about InstantAnalytics
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display font-semibold">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-primary shrink-0" />
                )}
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <p className="p-6 pt-0 text-muted-foreground">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}