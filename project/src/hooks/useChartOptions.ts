import { useMemo } from 'react';
import { useTheme } from './useTheme';
import { getChartColors } from '../components/dashboard/charts/config/theme';
import type { WarmupData } from '../types/chart';

export function useChartOptions(data: WarmupData[]) {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  
  return useMemo(() => ({
    backgroundColor: 'transparent',
    title: {
      text: 'Warmup Email Status Over Time',
      textStyle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 600,
        fontFamily: 'Space Grotesk',
      },
      left: 'center',
      top: 0,
      padding: [0, 0, 20, 0],
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: colors.tooltip.background,
      borderColor: colors.tooltip.border,
      borderWidth: 1,
      textStyle: {
        color: colors.tooltip.text,
        fontSize: 14,
        fontFamily: 'Space Grotesk',
      },
      formatter: (params: any[]) => {
        const date = params[0].name;
        const activeEmails = params[0].value;
        const inactiveEmails = params[1]?.value || 0;

        return `
          <div style="font-family: Space Grotesk; font-weight: 500;">
            <div style="margin-bottom: 8px;">${date}</div>
            <div style="color: ${colors.series.active.line}; margin-bottom: 4px;">
              Active: ${activeEmails}
            </div>
            <div style="color: ${colors.series.inactive.line};">
              Inactive: ${inactiveEmails}
            </div>
          </div>
        `;
      },
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.update_date),
      axisLine: {
        lineStyle: { color: colors.axisLine },
      },
      axisLabel: {
        color: colors.text,
        rotate: 45,
        hideOverlap: true,
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: 'Number of Emails',
      nameTextStyle: {
        color: colors.text,
        fontSize: 13,
        padding: [0, 0, 20, 0],
        fontFamily: 'Space Grotesk',
      },
      axisLine: {
        lineStyle: { color: colors.axisLine },
      },
      axisLabel: { color: colors.text },
      splitLine: {
        lineStyle: {
          color: colors.splitLine,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Active Emails',
        type: 'line',
        smooth: true,
        data: data.map(d => d.active_count),
        symbolSize: 8,
        lineStyle: {
          width: 4,
          color: colors.series.active.line,
        },
        itemStyle: {
          color: colors.series.active.line,
          borderWidth: 3,
          borderColor: colors.point.border,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: colors.series.active.area[0] },
              { offset: 1, color: colors.series.active.area[1] },
            ],
          },
        },
      },
      {
        name: 'Inactive Emails',
        type: 'line',
        smooth: true,
        data: data.map(d => d.inactive_count),
        symbolSize: 8,
        lineStyle: {
          width: 4,
          color: colors.series.inactive.line,
        },
        itemStyle: {
          color: colors.series.inactive.line,
          borderWidth: 3,
          borderColor: colors.point.border,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: colors.series.inactive.area[0] },
              { offset: 1, color: colors.series.inactive.area[1] },
            ],
          },
        },
      },
    ],
  }), [data, colors]);
}