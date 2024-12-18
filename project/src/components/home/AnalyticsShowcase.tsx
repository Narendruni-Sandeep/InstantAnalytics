import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../hooks/useTheme';

export function AnalyticsShowcase() {
  const { theme } = useTheme();

  const pieOptions = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
      borderColor: theme === 'dark' ? '#2f2f2f' : '#e2e8f0'
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
          show: false
        },
        data: [
          { value: 735, name: 'Gmail', itemStyle: { color: '#ef4444' } },
          { value: 580, name: 'Outlook', itemStyle: { color: '#3b82f6' } },
          { value: 484, name: 'Yahoo', itemStyle: { color: '#8b5cf6' } },
          { value: 300, name: 'Others', itemStyle: { color: '#22c55e' } }
        ]
      }
    ]
  };

  const barOptions = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
      borderColor: theme === 'dark' ? '#2f2f2f' : '#e2e8f0'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      axisLine: {
        lineStyle: { color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0' }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0' }
      },
      splitLine: {
        lineStyle: { color: theme === 'dark' ? '#2f2f2f' : '#e2e8f0' }
      }
    },
    series: [
      {
        data: [
          { value: 120, itemStyle: { color: '#3b82f6' } },
          { value: 200, itemStyle: { color: '#22c55e' } },
          { value: 150, itemStyle: { color: '#8b5cf6' } },
          { value: 80, itemStyle: { color: '#ef4444' } },
          { value: 70, itemStyle: { color: '#f59e0b' } }
        ],
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  };

  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Beautiful Analytics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Get insights at a glance with our interactive charts and visualizations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <h3 className="text-lg font-display font-semibold mb-4">
              Email Provider Distribution
            </h3>
            <ReactECharts 
              option={pieOptions}
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <h3 className="text-lg font-display font-semibold mb-4">
              Weekly Campaign Performance
            </h3>
            <ReactECharts 
              option={barOptions}
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}