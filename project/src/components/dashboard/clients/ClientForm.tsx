import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { X } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  campaign_name: string; // This stores the abbreviation
}

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: Omit<Client, 'id'>) => void;
  onCancel: () => void;
}

export function ClientForm({ client, onSubmit, onCancel }: ClientFormProps) {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    campaign_name: client?.campaign_name || '', // Using campaign_name for abbreviation
  });

  const [errors, setErrors] = useState({
    name: '',
    campaign_name: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      campaign_name: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.campaign_name.trim()) {
      newErrors.campaign_name = 'Abbreviation is required';
    } else if (formData.campaign_name.length > 5) {
      newErrors.campaign_name = 'Abbreviation must be 5 characters or less';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 rounded-xl bg-card border border-border"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-foreground">
          {client ? 'Edit Client' : 'Add New Client'}
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Client Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            required
          />
          <Input
            label="Abbreviation"
            value={formData.campaign_name}
            onChange={(e) => setFormData({ 
              ...formData, 
              campaign_name: e.target.value.toUpperCase() 
            })}
            error={errors.campaign_name}
            maxLength={5}
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {client ? 'Update Client' : 'Add Client'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}