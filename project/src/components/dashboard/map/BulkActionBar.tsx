import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onApplyToClient: (clientId: string) => Promise<void>;
  clients: Array<{ id: string; name: string }>;
}

export function BulkActionBar({ 
  selectedCount, 
  onClearSelection, 
  onApplyToClient,
  clients 
}: BulkActionBarProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!selectedClient) {
      setError('Please select a client');
      return;
    }
    
    try {
      setIsUpdating(true);
      setError('');
      await onApplyToClient(selectedClient);
      setSelectedClient('');
    } catch (err) {
      setError('Failed to update. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-4 px-6 py-4 rounded-lg bg-card border border-border shadow-lg backdrop-blur-xl">
        <span className="text-sm text-muted-foreground">
          {selectedCount} items selected
        </span>

        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="flex items-center gap-2">
          <select
            onChange={(e) => {
              setSelectedClient(e.target.value);
              setError('');
            }}
            value={selectedClient}
            disabled={isUpdating}
            className="px-3 py-1.5 rounded-lg bg-card text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleApply}
            disabled={isUpdating || !selectedClient}
            className={`
              p-2 rounded-lg transition-colors
              ${selectedClient
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground'}
              disabled:opacity-50
            `}
          >
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </button>
        </div>

        <button
          onClick={onClearSelection}
          disabled={isUpdating}
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}