import React from 'react';
import ReactECharts from 'echarts-for-react';
import { format, parseISO } from 'date-fns';
import { useTheme } from '../../../../hooks/useTheme';

interface SingleMetricChartProps {
  dates: string[];
  data: number[];
  color: string;
  isLoading: boolean;
  error: string | null;
}

export function SingleMetricChart({ 
  dates, 
  data, 
  color,
  isLoading, 
  error 
}: SingleMetricChartProps) {
  const { theme } = useTheme();

  // Format dates for display
  const formattedDates = dates.map(date => 
    format(parseISO(date), 'd MMM')  // Format as "4 Dec"
  );

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
      },
      formatter: (params: any) => {
        const date = parseISO(dates[params[0].dataIndex]);
        return `
          <div style="font-family: Space Grotesk; padding: 8px;">
            <div style="margin-bottom: 8px; color: ${theme === 'dark' ? '#ffffff' : '#000000'}">
              ${format(date, 'd MMM yyyy')}
            </div>
            <div style="color: ${color}">
              Value: ${params[0].value}
            </div>
          </div>
        `;
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
      type: 'line',
      data: data,
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 4,
        color: color
      },
      itemStyle: {
        color: color,
        borderWidth: 2,
        borderColor: theme === 'dark' ? '#1f1f1f' : '#ffffff'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0,
            color: `${color}33` // 20% opacity
          }, {
            offset: 1,
            color: `${color}05` // 2% opacity
          }]
        }
      }
    }]
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