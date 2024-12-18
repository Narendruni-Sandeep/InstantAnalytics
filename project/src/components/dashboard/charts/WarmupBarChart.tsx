import React from 'react';
import { useWarmupData } from '../../../hooks/useWarmupData';
import { useChartTheme } from '../../../hooks/useChartTheme';
import { createBarChartOptions } from './ChartOptions';
import { ChartWrapper } from './ChartWrapper';

export function WarmupBarChart() {
  const { data, isLoading, error } = useWarmupData();
  const theme = useChartTheme();
  const options = React.useMemo(() => createBarChartOptions(data, theme), [data, theme]);

  return (
    <ChartWrapper
      options={options}
      loading={isLoading}
      error={error}
    />
  );
}