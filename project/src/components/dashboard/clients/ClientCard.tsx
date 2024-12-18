import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Client {
  id: string;
  name: string;
  campaign_name: string;
}

interface ClientCardProps {
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
}

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/dashboard/clients/${client.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={handleClick}
      className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
              {client.name}
            </h3>
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
              {client.campaign_name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}