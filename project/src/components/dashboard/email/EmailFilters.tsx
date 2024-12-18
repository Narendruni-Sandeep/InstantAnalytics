import React, { useEffect } from 'react';
import { ClientSelect } from './ClientSelect';
import { DateRangePicker } from './DateRangePicker';
import type { Client } from '../../../types/client';
import type { EmailFiltersState } from '../../../types/email';

interface EmailFiltersProps {
  clients: Client[];
  isLoading: boolean;
  value: EmailFiltersState;
  onChange: (filters: EmailFiltersState) => void;
}

export function EmailFilters({ clients, isLoading, value, onChange }: EmailFiltersProps) {
  // Set first client as default when clients are loaded
  useEffect(() => {
    if (clients.length > 0 && !value.clientId) {
      onChange({
        ...value,
        clientId: clients[0].id
      });
    }
  }, [clients]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="w-full sm:w-64">
        <ClientSelect
          clients={clients}
          value={value.clientId}
          onChange={(clientId) => onChange({ ...value, clientId })}
          isLoading={isLoading}
        />
      </div>

      <DateRangePicker
        startDate={value.dateRange.startDate}
        endDate={value.dateRange.endDate}
        onChange={(dateRange) => onChange({ ...value, dateRange })}
      />
    </div>
  );
}