import React from 'react';
import { useWarmupData } from '../../../hooks/useWarmupData';
import { useChartTheme } from '../../../hooks/useChartTheme';
import { createPieChartOptions } from './ChartOptions';
import { ChartWrapper } from './ChartWrapper';

export function WarmupPieChart() {
  const { data, isLoading, error } = useWarmupData();
  const theme = useChartTheme();
  
  const yesterdayData = React.useMemo(() => {
    if (!data.length) return null;
    return data[data.length - 1];
  }, [data]);

  const options = React.useMemo(() => 
    createPieChartOptions(yesterdayData, theme), 
    [yesterdayData, theme]
  );

  return (
    <ChartWrapper
      options={options}
      loading={isLoading}
      error={error}
    />
  );
}