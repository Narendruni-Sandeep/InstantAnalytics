import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../Button';
import { Input } from '../../Input';

interface DeleteConfirmDialogProps {
  clientName: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmDialog({ 
  clientName, 
  isOpen, 
  onClose, 
  onConfirm 
}: DeleteConfirmDialogProps) {
  const [confirmName, setConfirmName] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (confirmName !== clientName) {
      setError('Client name does not match');
      return;
    }
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md p-6 rounded-xl bg-card border border-border shadow-lg"
      >
        <div className="flex items-center gap-3 text-destructive mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Delete Client</h2>
        </div>

        <p className="text-muted-foreground mb-6">
          This action cannot be undone. Please type <strong>{clientName}</strong> to confirm deletion.
        </p>

        <Input
          label="Confirm client name"
          value={confirmName}
          onChange={(e) => {
            setConfirmName(e.target.value);
            setError('');
          }}
          error={error}
          placeholder={clientName}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Client
          </Button>
        </div>
      </motion.div>
    </div>
  );
}