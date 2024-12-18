import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../../../hooks/useTheme';
import type { CampaignData } from '../../../../types/campaign';

interface CampaignStatusChartProps {
  data: CampaignData[];
  isLoading: boolean;
  error: string | null;
}

export function CampaignStatusChart({ data, isLoading, error }: CampaignStatusChartProps) {
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

  // Count campaigns by status
  const statusCounts = data.reduce((acc: Record<string, number>, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const options = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
      borderColor: theme === 'dark' ? '#2f2f2f' : '#e2e8f0',
      textStyle: {
        color: theme === 'dark' ? '#ffffff' : '#000000'
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#ffffff' : '#000000'
          }
        },
        data: Object.entries(statusCounts).map(([name, value]) => ({
          name,
          value
        }))
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