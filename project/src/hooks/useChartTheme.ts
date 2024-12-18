import { useTheme } from './useTheme';
import { useEffect, useState } from 'react';

export interface ChartTheme {
  backgroundColor: string;
  text: {
    primary: string;
    secondary: string;
  };
  axis: {
    line: string;
    label: string;
  };
  grid: {
    line: string;
  };
  tooltip: {
    background: string;
    border: string;
    text: string;
  };
  colors: {
    success: string;
    danger: string;
    successGradient: [string, string];
    dangerGradient: [string, string];
  };
}

export function useChartTheme(): ChartTheme {
  const { theme } = useTheme();
  const [chartTheme, setChartTheme] = useState<ChartTheme>(getThemeColors(theme));

  useEffect(() => {
    const root = window.document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const getHslColor = (variable: string) => {
      const hsl = computedStyle.getPropertyValue(variable).trim();
      return `hsl(${hsl})`;
    };

    const newTheme: ChartTheme = {
      backgroundColor: 'transparent',
      text: {
        primary: getHslColor('--foreground'),
        secondary: theme === 'dark' 
          ? 'rgba(255, 255, 255, 0.65)' 
          : 'rgba(0, 0, 0, 0.65)',
      },
      axis: {
        line: theme === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.15)',
        label: getHslColor('--foreground'),
      },
      grid: {
        line: theme === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)',
      },
      tooltip: {
        background: getHslColor('--card'),
        border: getHslColor('--border'),
        text: getHslColor('--foreground'),
      },
      colors: {
        success: '#22c55e',
        danger: '#ef4444',
        successGradient: ['rgba(34, 197, 94, 0.25)', 'rgba(34, 197, 94, 0.02)'],
        dangerGradient: ['rgba(239, 68, 68, 0.25)', 'rgba(239, 68, 68, 0.02)'],
      },
    };

    setChartTheme(newTheme);
  }, [theme]);

  return chartTheme;
}

function getThemeColors(theme: 'dark' | 'light'): ChartTheme {
  return {
    backgroundColor: 'transparent',
    text: {
      primary: theme === 'dark' ? '#FFFFFF' : '#000000',
      secondary: theme === 'dark' 
        ? 'rgba(255, 255, 255, 0.65)' 
        : 'rgba(0, 0, 0, 0.65)',
    },
    axis: {
      line: theme === 'dark'
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.15)',
      label: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    grid: {
      line: theme === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)',
    },
    tooltip: {
      background: theme === 'dark' ? '#18181B' : '#FFFFFF',
      border: theme === 'dark'
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.15)',
      text: theme === 'dark' ? '#FFFFFF' : '#000000',
    },
    colors: {
      success: '#22c55e',
      danger: '#ef4444',
      successGradient: ['rgba(34, 197, 94, 0.25)', 'rgba(34, 197, 94, 0.02)'],
      dangerGradient: ['rgba(239, 68, 68, 0.25)', 'rgba(239, 68, 68, 0.02)'],
    },
  };
}