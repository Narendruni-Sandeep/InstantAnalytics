import React from 'react';
import { useWarmupData } from '../../../hooks/useWarmupData';
import { useChartTheme } from '../../../hooks/useChartTheme';
import { createLineChartOptions } from './ChartOptions';
import { ChartWrapper } from './ChartWrapper';

export function EmailWarmupChart() {
  const { data, isLoading, error } = useWarmupData();
  const theme = useChartTheme();
  const options = React.useMemo(() => createLineChartOptions(data, theme), [data, theme]);

  return (
    <ChartWrapper
      options={options}
      loading={isLoading}
      error={error}
    />
  );
}