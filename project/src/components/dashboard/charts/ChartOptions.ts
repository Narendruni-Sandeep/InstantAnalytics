import type { ChartTheme } from '../../../hooks/useChartTheme';
import type { WarmupData } from '../../../types/chart';

export function createLineChartOptions(data: WarmupData[], theme: ChartTheme) {
  return {
    backgroundColor: theme.backgroundColor,
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.tooltip.background,
      borderColor: theme.tooltip.border,
      textStyle: {
        color: theme.tooltip.text,
        fontFamily: 'Space Grotesk',
      },
      formatter: (params: any[]) => {
        const date = params[0].name;
        const activeEmails = params[0].value;
        const inactiveEmails = params[1]?.value || 0;

        return `
          <div style="font-family: Space Grotesk; padding: 8px;">
            <div style="margin-bottom: 8px; color: ${theme.tooltip.text}">
              ${date}
            </div>
            <div style="color: ${theme.colors.success}; margin-bottom: 4px;">
              Active: ${activeEmails}
            </div>
            <div style="color: ${theme.colors.danger};">
              Inactive: ${inactiveEmails}
            </div>
          </div>
        `;
      },
    },
    legend: {
      data: ['Active', 'Inactive'],
      textStyle: {
        color: theme.text.primary,
        fontFamily: 'Space Grotesk',
      }
    },
    grid: {
      top: 30,
      right: '3%',
      bottom: '3%',
      left: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.update_date),
      axisLine: {
        lineStyle: { color: theme.axis.line },
      },
      axisLabel: {
        color: theme.axis.label,
        fontFamily: 'Space Grotesk',
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: 'Number of Emails',
      nameTextStyle: {
        color: theme.text.primary,
        padding: [0, 0, 20, 0],
        fontFamily: 'Space Grotesk',
      },
      axisLine: {
        lineStyle: { color: theme.axis.line },
      },
      axisLabel: {
        color: theme.axis.label,
      },
      splitLine: {
        lineStyle: {
          color: theme.grid.line,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Active',
        type: 'line',
        smooth: true,
        data: data.map(d => d.active_count),
        itemStyle: { color: theme.colors.success },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: theme.colors.successGradient[0] },
              { offset: 1, color: theme.colors.successGradient[1] },
            ],
          },
        },
      },
      {
        name: 'Inactive',
        type: 'line',
        smooth: true,
        data: data.map(d => d.inactive_count),
        itemStyle: { color: theme.colors.danger },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: theme.colors.dangerGradient[0] },
              { offset: 1, color: theme.colors.dangerGradient[1] },
            ],
          },
        },
      },
    ],
  };
}

export function createBarChartOptions(data: WarmupData[], theme: ChartTheme) {
  return {
    backgroundColor: theme.backgroundColor,
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.tooltip.background,
      borderColor: theme.tooltip.border,
      textStyle: {
        color: theme.tooltip.text,
        fontFamily: 'Space Grotesk',
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Active', 'Inactive'],
      textStyle: {
        color: theme.text.primary,
        fontFamily: 'Space Grotesk',
      }
    },
    grid: {
      top: 30,
      right: '3%',
      bottom: '3%',
      left: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.update_date),
      axisLine: {
        lineStyle: { color: theme.axis.line }
      },
      axisLabel: {
        color: theme.axis.label,
        fontFamily: 'Space Grotesk',
      },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'Number of Emails',
      nameTextStyle: {
        color: theme.text.primary,
        padding: [0, 0, 20, 0],
        fontFamily: 'Space Grotesk',
      },
      axisLine: {
        lineStyle: { color: theme.axis.line }
      },
      axisLabel: {
        color: theme.axis.label
      },
      splitLine: {
        lineStyle: {
          color: theme.grid.line,
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'Active',
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        data: data.map(d => d.active_count),
        itemStyle: {
          color: theme.colors.success,
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: theme.colors.success,
            shadowBlur: 10,
            shadowColor: theme.colors.successGradient[0]
          }
        }
      },
      {
        name: 'Inactive',
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        data: data.map(d => d.inactive_count),
        itemStyle: {
          color: theme.colors.danger,
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: theme.colors.danger,
            shadowBlur: 10,
            shadowColor: theme.colors.dangerGradient[0]
          }
        }
      }
    ]
  };
}

export function createPieChartOptions(data: WarmupData | null, theme: ChartTheme) {
  return {
    backgroundColor: theme.backgroundColor,
    tooltip: {
      trigger: 'item',
      backgroundColor: theme.tooltip.background,
      borderColor: theme.tooltip.border,
      textStyle: {
        color: theme.tooltip.text,
        fontFamily: 'Space Grotesk',
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center',
      textStyle: {
        color: theme.text.primary,
        fontFamily: 'Space Grotesk',
      }
    },
    series: [
      {
        name: 'Email Status',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: theme.backgroundColor,
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            formatter: '{b}\n{c} ({d}%)',
            color: theme.text.primary
          }
        },
        data: data ? [
          { 
            value: data.active_count, 
            name: 'Active',
            itemStyle: { color: theme.colors.success }
          },
          { 
            value: data.inactive_count, 
            name: 'Inactive',
            itemStyle: { color: theme.colors.danger }
          }
        ] : []
      }
    ]
  };
}