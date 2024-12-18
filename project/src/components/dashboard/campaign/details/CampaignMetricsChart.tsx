import React from 'react';
import ReactECharts from 'echarts-for-react';
import { format, parseISO } from 'date-fns';
import { useTheme } from '../../../../hooks/useTheme';
import type { CampaignHistory } from '../../../../types/campaign';

interface CampaignMetricsChartProps {
  history: CampaignHistory[];
  emailMetrics: Array<{
    update_date: string;
    sent_count: number;
    reply_count: number;
    bounce_count: number;
  }>;
}

export function CampaignMetricsChart({ history, emailMetrics }: CampaignMetricsChartProps) {
  const { theme } = useTheme();

  const options = React.useMemo(() => {
    // Combine dates from both datasets
    const allDates = [...new Set([
      ...history.map(h => h.update_date),
      ...emailMetrics.map(e => e.update_date)
    ])].sort();

    // Create data series
    const series = [
      {
        name: 'Total Sent',
        data: allDates.map(date => {
          const metric = emailMetrics.find(m => m.update_date === date);
          return metric?.sent_count || 0;
        }),
        color: '#3b82f6' // blue
      },
      {
        name: 'Replies',
        data: allDates.map(date => {
          const metric = emailMetrics.find(m => m.update_date === date);
          return metric?.reply_count || 0;
        }),
        color: '#22c55e' // green
      },
      {
        name: 'Bounces',
        data: allDates.map(date => {
          const metric = emailMetrics.find(m => m.update_date === date);
          return metric?.bounce_count || 0;
        }),
        color: '#ef4444' // red
      },
      {
        name: 'New Leads',
        data: allDates.map(date => {
          const entry = history.find(h => h.update_date === date);
          return entry?.new_lead_contacted || 0;
        }),
        color: '#8b5cf6' // purple
      },
      {
        name: 'Interested',
        data: allDates.map(date => {
          const entry = history.find(h => h.update_date === date);
          return entry?.interested_lead || 0;
        }),
        color: '#f59e0b' // amber
      }
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
        borderColor: theme === 'dark' ? '#2f2f2f' : '#e2e8f0',
        textStyle: {
          color: theme === 'dark' ? '#ffffff' : '#000000',
          fontFamily: 'Space Grotesk'
        }
      },
      legend: {
        data: series.map(s => s.name),
        textStyle: {
          color: theme === 'dark' ? '#a1a1aa' : '#71717a',
          fontFamily: 'Space Grotesk'
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
        data: allDates.map(date => format(parseISO(date), 'MMM d')),
        axisLine: {
          lineStyle: { color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0' }
        },
        axisLabel: {
          color: theme === 'dark' ? '#a1a1aa' : '#71717a',
          fontFamily: 'Space Grotesk'
        }
      },
      yAxis: {
        type: 'value',
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
      series: series.map(s => ({
        name: s.name,
        type: 'line',
        data: s.data,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
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
  }, [history, emailMetrics, theme]);

  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">
        Campaign Metrics Over Time
      </h3>
      <ReactECharts 
        option={options}
        style={{ height: '400px' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}