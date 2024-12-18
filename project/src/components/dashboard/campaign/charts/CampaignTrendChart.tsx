import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../../../hooks/useTheme';
import type { CampaignData } from '../../../../types/campaign';

interface CampaignTrendChartProps {
  data: CampaignData[];
  isLoading: boolean;
  error: string | null;
}

export function CampaignTrendChart({ data, isLoading, error }: CampaignTrendChartProps) {
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
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
      borderColor: theme === 'dark' ? '#2f2f2f' : '#e2e8f0',
      textStyle: {
        color: theme === 'dark' ? '#ffffff' : '#000000'
      }
    },
    legend: {
      data: ['Sent', 'Replies', 'Bounces'],
      textStyle: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
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
        name: 'Sent',
        type: 'line',
        data: data.map(d => d.total_sent),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Replies',
        type: 'line',
        data: data.map(d => d.leads_replied),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Bounces',
        type: 'line',
        data: data.map(d => d.bounce_lead),
        smooth: true,
        itemStyle: { color: '#ef4444' }
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