import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading,
  className,
  ...props 
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full px-5 py-2.5 rounded-xl font-medium text-sm",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === 'primary' && [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
          "shadow-lg shadow-primary/25",
        ],
        variant === 'secondary' && [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
          "border border-border",
        ],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      ) : children}
    </motion.button>
  );
}