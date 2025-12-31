import { Field } from '@grafana/data';

export const getTrend = (field: Field): 'improving' | 'declining' | 'stable' => {
  if (field.values.length < 2) {
    return 'stable';
  }
  
  const current = field.values.get(field.values.length - 1);
  const previous = field.values.get(field.values.length - 2);
  
  const change = ((current - previous) / previous) * 100;
  
  if (change > 5) return 'improving';
  if (change < -5) return 'declining';
  return 'stable';
};

export const getTrendEmoji = (trend: string, isHigherBetter: boolean): string => {
  if (trend === 'stable') return '➡️';
  if (trend === 'improving') return isHigherBetter ? '📈' : '📉';
  return isHigherBetter ? '📉' : '📈';
};

export const getChangePercent = (field: Field): number => {
  if (field.values.length < 2) {
    return 0;
  }
  
  const current = field.values.get(field.values.length - 1);
  const previous = field.values.get(field.values.length - 2);
  
  return ((current - previous) / previous) * 100;
};

export const getHistoricalSummary = (field: Field, thresholds: {
  excellent: number;
  good: number;
  ok: number;
  warning: number;
}) => {
  const values = field.values.toArray();
  const recentValues = values.slice(-10); 
  
  const excellent = recentValues.filter(v => v >= thresholds.excellent).length;
  const good = recentValues.filter(v => v >= thresholds.good && v < thresholds.excellent).length;
  const ok = recentValues.filter(v => v >= thresholds.ok && v < thresholds.good).length;
  const warning = recentValues.filter(v => v >= thresholds.warning && v < thresholds.ok).length;
  const critical = recentValues.filter(v => v < thresholds.warning).length;
  
  return { excellent, good, ok, warning, critical, total: recentValues.length };
};

export const getStatistics = (field: Field) => {
  const values = field.values.toArray();
  
  if (values.length === 0) {
    return { min: 0, max: 0, avg: 0, count: 0 };
  }
  
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  
  return { min, max, avg, count: values.length };
};