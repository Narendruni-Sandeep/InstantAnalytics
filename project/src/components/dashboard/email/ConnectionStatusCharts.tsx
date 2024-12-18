import React from 'react';
import { ConnectionLineChart } from './ConnectionLineChart';
import type { ConnectionStatusData } from '../../../types/email';

interface ConnectionStatusChartsProps {
  data: ConnectionStatusData[];
  isLoading: boolean;
  error: string | null;
}

export function ConnectionStatusCharts({ data, isLoading, error }: ConnectionStatusChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          Connected Mailboxes
        </h2>
        <ConnectionLineChart
          data={data}
          type="active"
          isLoading={isLoading}
          error={error}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          Disconnected Mailboxes
        </h2>
        <ConnectionLineChart
          data={data}
          type="inactive"
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}