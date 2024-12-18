import React from 'react';

export function StatsGrid() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="h-[200px] rounded-xl bg-card/50 animate-pulse"
        />
      ))}
    </div>
  );
}