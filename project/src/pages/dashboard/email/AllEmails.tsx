import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { EmailList } from '../../../components/dashboard/email/all/EmailList';
import { EmailFilters } from '../../../components/dashboard/email/all/EmailFilters';
import { useAllEmails } from '../../../hooks/useAllEmails';

export function AllEmails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { emails, isLoading, error } = useAllEmails();

  // Filter emails based on search term and status
  const filteredEmails = React.useMemo(() => {
    if (!emails) return [];
    
    return emails.filter(email => {
      const matchesSearch = (
        email.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.domain?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === 'all' || email.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [emails, searchTerm, statusFilter]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-foreground">
            All Mailbox Accounts
          </h1>
        </div>

        <EmailFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <EmailList
          emails={filteredEmails}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
}