import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../../hooks/useTheme';
import type { WarmupStatusData } from '../../../types/email';

interface WarmupStatusChartProps {
  data: WarmupStatusData[];
  isLoading: boolean;
  error: string | null;
}

export function WarmupStatusChart({ data, isLoading, error }: WarmupStatusChartProps) {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="h-[400px] rounded-xl bg-card border border-border p-6">
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[400px] rounded-xl bg-card border border-border p-6">
        <div className="h-full flex items-center justify-center text-destructive">
          {error}
        </div>
      </div>
    );
  }

  const options = {
    backgroundColor: 'transparent',
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
      borderColor: theme === 'dark' ? '#2f2f2f' : '#e2e8f0',
      textStyle: {
        color: theme === 'dark' ? '#ffffff' : '#000000'
      }
    },
    legend: {
      data: ['Active', 'Inactive'],
      textStyle: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a'
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.update_date),
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a',
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: 'Number of Emails',
      nameTextStyle: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a'
      },
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a'
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'Active',
        type: 'bar',
        stack: 'total',
        data: data.map(d => d.active_count),
        itemStyle: {
          color: theme === 'dark' ? '#22c55e' : '#16a34a'
        }
      },
      {
        name: 'Inactive',
        type: 'bar',
        stack: 'total',
        data: data.map(d => d.inactive_count),
        itemStyle: {
          color: theme === 'dark' ? '#ef4444' : '#dc2626'
        }
      }
    ]
  };

  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <ReactECharts 
        option={options}
        style={{ height: '400px' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}