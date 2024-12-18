import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        className={cn(
          "w-full px-4 py-3 rounded-xl",
          "bg-card text-card-foreground",
          "border border-input",
          "placeholder:text-muted-foreground",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          error && "!ring-2 !ring-destructive",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}