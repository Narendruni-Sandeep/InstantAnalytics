import React from 'react';
import { SearchBar } from '../../../shared/SearchBar';

interface CampaignFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function CampaignFilters({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusChange 
}: CampaignFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        onClear={() => onSearchChange('')}
        placeholder="Search campaigns..."
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full sm:w-48 px-4 py-2 rounded-lg bg-card text-foreground border border-input 
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}