import React from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onClear, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 rounded-lg bg-card text-foreground border border-input 
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-input
          placeholder:text-muted-foreground"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
            hover:bg-accent text-muted-foreground hover:text-foreground
            transition-colors"
        >
          <X className="w-3 h-3" />
        </motion.button>
      )}
    </div>
  );
}