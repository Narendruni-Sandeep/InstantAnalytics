import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export function OnboardingLayout({ children, currentStep, totalSteps }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 relative mt-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 rounded-full mx-1 overflow-hidden bg-gray-200 dark:bg-gray-800"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: index + 1 <= currentStep ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full bg-purple-600"
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="glass-card backdrop-blur-xl border border-white/20 dark:border-purple-900/20 p-8 rounded-2xl"
          >
            {children}
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}