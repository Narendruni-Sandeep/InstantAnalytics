import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What happens after my free trial?',
    answer: 'After your 5-day free trial ends, you\'ll be prompted to enter your payment information to continue using InstantAnalytics. If you choose not to subscribe, your account will be limited until you upgrade.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes! You can cancel your subscription at any time. Once cancelled, you\'ll continue to have access until the end of your current billing period.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with InstantAnalytics, contact our support team within 30 days of your purchase for a full refund.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and process payments securely through Stripe.'
  }
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-4"
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
            Have questions? We have answers.
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