import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface DataPoint {
  x: string;
  y: number;
}

interface AnimatedChartProps {
  data: DataPoint[];
  height?: number;
  delay?: number;
}

export function AnimatedChart({ data, height = 200, delay = 0.5 }: AnimatedChartProps) {
  const controls = useAnimation();
  const isMounted = useRef(false);
  const maxValue = Math.max(...data.map(d => d.y));
  
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: ((maxValue - d.y) / maxValue) * height,
  }));

  const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const fillPathD = `${pathD} L ${points[points.length - 1].x},${height} L 0,${height} Z`;

  useEffect(() => {
    isMounted.current = true;
    
    const startAnimation = async () => {
      try {
        // Wait for delay
        await new Promise(resolve => setTimeout(resolve, delay * 1000));
        
        // Check if component is still mounted
        if (!isMounted.current) return;
        
        // Start the animation
        await controls.start({
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.5, ease: "easeInOut" }
        });
      } catch (error) {
        // Handle any animation errors
        console.error('Animation error:', error);
      }
    };

    startAnimation();

    return () => {
      isMounted.current = false;
    };
  }, [controls, delay]);

  return (
    <div className="relative w-full" style={{ height }}>
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Grid lines */}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={i * (height / 4)}
            x2="100%"
            y2={i * (height / 4)}
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeDasharray="4 4"
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={fillPathD}
          fill="url(#gradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay }}
        />

        {/* Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.2)" />
          </linearGradient>
        </defs>

        {/* Value indicators */}
        {points.map((point, index) => (
          <motion.g
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.1 * index }}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              className="fill-primary"
            />
            <text
              x={point.x}
              y={point.y - 10}
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              {data[index].y}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}