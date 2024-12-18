import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import { ClientCard } from './ClientCard';

interface Client {
  id: string;
  name: string;
  campaign_name: string;
}

interface ClientListProps {
  clients: Client[];
  isLoading: boolean;
  onDelete: (client: Client) => void;
  onEdit: (client: Client) => void;
}

export function ClientList({ clients, isLoading, onDelete, onEdit }: ClientListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-xl bg-card border border-border"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          No Clients Yet
        </h3>
        <p className="text-muted-foreground max-w-md">
          Add your first client to start managing your contacts and campaigns effectively.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onEdit={() => onEdit(client)}
            onDelete={() => onDelete(client)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}