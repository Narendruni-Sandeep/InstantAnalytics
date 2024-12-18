import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Client } from '../../../types/client';

interface ClientSelectProps {
  clients: Client[];
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export function ClientSelect({ clients, value, onChange, isLoading }: ClientSelectProps) {
  return (
    <div className="relative">
      {isLoading ? (
        <div className="w-full h-10 rounded-lg bg-card animate-pulse" />
      ) : (
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none px-4 py-2 pr-10 rounded-lg bg-card border border-input text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <motion.div 
              animate={{ rotate: value ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}