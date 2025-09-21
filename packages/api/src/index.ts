export const queryKey = ['api'] as const;

export function fetcher<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}

export { createQueryClient } from './queryClient';
export * from './persistence';
export * from './hooks';
export * from './queue';
export type { Report } from './mocks/reports';

