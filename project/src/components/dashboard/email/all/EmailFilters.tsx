import React from 'react';
import { SearchBar } from '../../../shared/SearchBar';

interface EmailFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function EmailFilters({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusChange 
}: EmailFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        onClear={() => onSearchChange('')}
        placeholder="Search mailbox accounts..."
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full sm:w-48 px-4 py-2 rounded-lg bg-card text-foreground border border-input 
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
      >
        <option value="all">All Status</option>
        <option value="active">Connected</option>
        <option value="inactive">Disconnected</option>
      </select>
    </div>
  );
}