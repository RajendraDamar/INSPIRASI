import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mockForecast, ForecastType } from './mocks/forecast';
import { mockReports } from './mocks/reports';
import { mockAlerts } from './mocks/alerts';
import { v4 as uuidv4 } from 'uuid';

export function useForecast(type: ForecastType) {
  return useQuery(['forecast', type], async () => {
    // simulate fetch
    return mockForecast(type);
  });
}

export function useReports() {
  const qc = useQueryClient();
  return useQuery(['reports'], async () => {
    return mockReports();
  }, {
    onSuccess(data) {
      // cache immutable reports
      qc.setQueryData(['reports'], data);
    },
  });
}

export function useAlerts() {
  return useQuery(['alerts'], async () => {
    return mockAlerts();
  });
}

export function addReport(title: string, description?: string) {
  // This is an in-memory mock append; durable persistence must be implemented separately.
  const r = { id: uuidv4(), createdAt: new Date().toISOString(), title, description };
  // no-op: in real app you'd POST to server. Return the created report.
  return Promise.resolve(r);
}
