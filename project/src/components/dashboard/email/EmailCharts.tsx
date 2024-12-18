import React from 'react';
import { EmailTrendChart } from './EmailTrendChart';
import { WarmupStatusChart } from './WarmupStatusChart';
import type { EmailTrendData, WarmupStatusData } from '../../../types/email';

interface EmailChartsProps {
  trendData: EmailTrendData[];
  warmupData: WarmupStatusData[];
  isLoading: boolean;
  error: string | null;
}

export function EmailCharts({ trendData, warmupData, isLoading, error }: EmailChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          Email Updates Trend
        </h2>
        <EmailTrendChart
          data={trendData}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          Warmup Status Distribution
        </h2>
        <WarmupStatusChart
          data={warmupData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}