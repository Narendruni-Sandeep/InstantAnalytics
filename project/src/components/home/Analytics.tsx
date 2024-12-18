import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../hooks/useTheme';

export function Analytics() {
  const { theme } = useTheme();

  const chartOptions = {
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
      data: ['Sent', 'Replies', 'Interested'],
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#a1a1aa' : '#71717a'
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
          color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0'
        }
      }
    },
    series: [
      {
        name: 'Sent',
        type: 'line',
        smooth: true,
        data: [150, 230, 224, 218, 135, 147, 260],
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Replies',
        type: 'line',
        smooth: true,
        data: [45, 73, 68, 64, 42, 44, 78],
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Interested',
        type: 'line',
        smooth: true,
        data: [12, 25, 21, 18, 14, 15, 27],
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Make Data-Driven Decisions
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Stop guessing and start knowing. Our powerful analytics dashboard gives you 
                real-time insights into your email campaign performance.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Track sent emails across campaigns and sequences
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Monitor reply rates and engagement metrics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  Identify interested leads and opportunities
                </li>
              </ul>
              <p>
                What used to take hours of manual work is now available instantly. Focus on 
                optimizing your campaigns instead of building reports.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <ReactECharts 
              option={chartOptions}
              style={{ height: '400px' }}
              opts={{ renderer: 'svg' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}