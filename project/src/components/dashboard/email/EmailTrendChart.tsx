import React from 'react';
import ReactECharts from 'echarts-for-react';
import { format, parseISO } from 'date-fns';
import { useTheme } from '../../../hooks/useTheme';
import type { EmailTrendData } from '../../../types/email';

interface EmailTrendChartProps {
  data: EmailTrendData[];
  isLoading: boolean;
  error: string | null;
}

export function EmailTrendChart({ data, isLoading, error }: EmailTrendChartProps) {
  const { theme } = useTheme();

  // Format dates for display
  const formattedDates = data.map(d => 
    format(parseISO(d.update_date), 'd MMM')  // Format as "4 Dec"
  );

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
        color: theme === 'dark' ? '#ffffff' : '#000000',
        fontFamily: 'Space Grotesk'
      },
      formatter: (params: any) => {
        const date = parseISO(data[params[0].dataIndex].update_date);
        return `
          <div style="font-family: Space Grotesk; padding: 8px;">
            <div style="margin-bottom: 8px; color: ${theme === 'dark' ? '#ffffff' : '#000000'}">
              ${format(date, 'd MMM yyyy')}
            </div>
            <div style="color: ${theme === 'dark' ? '#7c3aed' : '#8b5cf6'}">
              Total: ${params[0].value}
            </div>
          </div>
        `;
      }
    },
    xAxis: {
      type: 'category',
      data: formattedDates,
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a',
        rotate: 45,
        fontSize: 12,
        fontFamily: 'Space Grotesk'
      }
    },
    yAxis: {
      type: 'value',
      name: 'Number of Emails',
      nameTextStyle: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a',
        fontFamily: 'Space Grotesk'
      },
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a',
        fontFamily: 'Space Grotesk'
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0',
          type: 'dashed'
        }
      }
    },
    series: [{
      name: 'Total Emails',
      type: 'line',
      data: data.map(d => d.total_count),
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 4,
        color: theme === 'dark' ? '#7c3aed' : '#8b5cf6'
      },
      itemStyle: {
        color: theme === 'dark' ? '#7c3aed' : '#8b5cf6',
        borderWidth: 2,
        borderColor: theme === 'dark' ? '#1f1f1f' : '#ffffff'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0,
            color: theme === 'dark' ? 'rgba(124, 58, 237, 0.25)' : 'rgba(139, 92, 246, 0.25)'
          }, {
            offset: 1,
            color: theme === 'dark' ? 'rgba(124, 58, 237, 0.02)' : 'rgba(139, 92, 246, 0.02)'
          }]
        }
      }
    }]
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