import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
}

export function AnimatedNumber({ value, duration = 1, delay = 0.5 }: AnimatedNumberProps) {
  const prevValue = useRef(value);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use spring animation for smooth transitions
  const springValue = useSpring(value, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  // Transform the spring value to display format
  const displayValue = useTransform(springValue, (latest) => 
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    // Only animate if the value has changed
    if (value !== prevValue.current) {
      setIsAnimating(true);
      springValue.set(value);
      prevValue.current = value;

      // Reset animation state after duration
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [value, duration, springValue]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`tabular-nums ${isAnimating ? 'text-primary' : ''}`}
    >
      <motion.span>{displayValue}</motion.span>
    </motion.span>
  );
}