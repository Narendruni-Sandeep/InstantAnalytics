import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ClientList } from '../../components/dashboard/clients/ClientList';
import { ClientForm } from '../../components/dashboard/clients/ClientForm';
import { ClientStats } from '../../components/dashboard/clients/ClientStats';
import { DeleteConfirmDialog } from '../../components/dashboard/clients/DeleteConfirmDialog';
import { useClients } from '../../hooks/useClients';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast } from '../../components/Toast';
import type { Client } from '../../types/client';

export function Clients() {
  const { clients, isLoading, error: clientsError, addClient, updateClient, deleteClient } = useClients();
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddClient = async (clientData: Omit<Client, 'id' | 'user_id' | 'created_at'>) => {
    const { error } = await addClient(clientData);
    
    if (error) {
      setError(error);
    } else {
      setIsAddingClient(false);
      setToastMessage('Client added successfully');
      setShowToast(true);
    }
  };

  const handleEditClient = async (updates: Omit<Client, 'id' | 'user_id' | 'created_at'>) => {
    if (!clientToEdit) return;

    const { error } = await updateClient(clientToEdit.id, updates, clientToEdit.name);
    
    if (error) {
      setError(error);
    } else {
      setClientToEdit(null);
      setToastMessage('Client updated successfully');
      setShowToast(true);
    }
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;

    const { error } = await deleteClient(clientToDelete.id);
    
    if (error) {
      setError(error);
    } else {
      setClientToDelete(null);
      setToastMessage('Client deleted successfully');
      setShowToast(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <h1 className="text-3xl font-display font-bold text-foreground">
              Clients
            </h1>
            <ClientStats totalClients={clients.length} />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddingClient(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            Add Client
          </motion.button>
        </div>

        {(error || clientsError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-message"
          >
            {error || clientsError}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isAddingClient || clientToEdit ? (
            <ClientForm
              client={clientToEdit}
              onSubmit={clientToEdit ? handleEditClient : handleAddClient}
              onCancel={() => {
                setIsAddingClient(false);
                setClientToEdit(null);
              }}
            />
          ) : (
            <ClientList
              clients={clients}
              isLoading={isLoading}
              onDelete={setClientToDelete}
              onEdit={setClientToEdit}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {clientToDelete && (
            <DeleteConfirmDialog
              clientName={clientToDelete.name}
              isOpen={true}
              onClose={() => setClientToDelete(null)}
              onConfirm={handleDeleteClient}
            />
          )}
        </AnimatePresence>

        <Toast
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </DashboardLayout>
  );
}