import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartCard } from './ChartCard';
import { useTheme } from '../../../hooks/useTheme';

interface ChartWrapperProps {
  options: any;
  loading?: boolean;
  error?: string | null;
}

export function ChartWrapper({ options, loading, error }: ChartWrapperProps) {
  const { theme } = useTheme();

  if (loading) {
    return (
      <ChartCard>
        <div className="flex items-center justify-center h-[400px]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </ChartCard>
    );
  }

  if (error) {
    return (
      <ChartCard>
        <div className="flex items-center justify-center h-[400px] text-destructive">
          {error}
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard>
      <ReactECharts
        option={options}
        style={{ height: '400px', width: '100%' }}
        notMerge={true}
        theme={theme}
        opts={{ renderer: 'svg' }}
      />
    </ChartCard>
  );
}