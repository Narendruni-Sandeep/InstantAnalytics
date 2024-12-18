import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavigationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  delay?: number;
}

export function NavigationCard({ icon: Icon, title, description, path, delay = 0 }: NavigationCardProps) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className="w-full p-6 rounded-xl bg-card border border-border hover:border-primary/50 text-left transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}