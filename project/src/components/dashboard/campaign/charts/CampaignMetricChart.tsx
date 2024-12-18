import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../../../hooks/useTheme';

interface Series {
  name: string;
  data: number[];
  color: string;
}

interface CampaignMetricChartProps {
  dates: string[];
  series: Series[];
  isLoading: boolean;
  error: string | null;
}

export function CampaignMetricChart({ dates, series, isLoading, error }: CampaignMetricChartProps) {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="h-[300px] rounded-xl bg-card border border-border p-6">
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[300px] rounded-xl bg-card border border-border p-6">
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
      data: series.map(s => s.name),
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
      data: dates,
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
    series: series.map(s => ({
      name: s.name,
      type: 'line',
      data: s.data,
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 3,
        color: s.color
      },
      itemStyle: {
        color: s.color,
        borderWidth: 2,
        borderColor: theme === 'dark' ? '#1f1f1f' : '#ffffff'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0,
            color: `${s.color}33` // 20% opacity
          }, {
            offset: 1,
            color: `${s.color}05` // 2% opacity
          }]
        }
      }
    }))
  };

  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <ReactECharts 
        option={options}
        style={{ height: '300px' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}