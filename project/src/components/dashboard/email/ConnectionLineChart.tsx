import React from 'react';
import ReactECharts from 'echarts-for-react';
import { format, parseISO } from 'date-fns';
import { useTheme } from '../../../hooks/useTheme';
import type { ConnectionStatusData } from '../../../types/email';

interface ConnectionLineChartProps {
  data: ConnectionStatusData[];
  type: 'active' | 'inactive';
  isLoading: boolean;
  error: string | null;
}

export function ConnectionLineChart({ data, type, isLoading, error }: ConnectionLineChartProps) {
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

  const lineColor = type === 'active' 
    ? theme === 'dark' ? '#22c55e' : '#16a34a'  // Green
    : theme === 'dark' ? '#ef4444' : '#dc2626';  // Red

  const areaColors = type === 'active'
    ? [
        theme === 'dark' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(22, 163, 74, 0.25)',
        theme === 'dark' ? 'rgba(34, 197, 94, 0.02)' : 'rgba(22, 163, 74, 0.02)'
      ]
    : [
        theme === 'dark' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(220, 38, 38, 0.25)',
        theme === 'dark' ? 'rgba(239, 68, 68, 0.02)' : 'rgba(220, 38, 38, 0.02)'
      ];

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
            <div style="color: ${lineColor}">
              Count: ${params[0].value}
            </div>
          </div>
        `;
      }
    },
    xAxis: {
      type: 'category',
      data: formattedDates,
      axisLine: {
        lineStyle: { color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0' }
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
      name: 'Number of Mailboxes',
      nameTextStyle: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a',
        padding: [0, 0, 20, 0],
        fontFamily: 'Space Grotesk'
      },
      axisLine: {
        lineStyle: { color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0' }
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
      type: 'line',
      data: data.map(d => type === 'active' ? d.active_count : d.inactive_count),
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 4,
        color: lineColor
      },
      itemStyle: {
        color: lineColor,
        borderWidth: 2,
        borderColor: theme === 'dark' ? '#1f1f1f' : '#ffffff'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0,
            color: areaColors[0]
          }, {
            offset: 1,
            color: areaColors[1]
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