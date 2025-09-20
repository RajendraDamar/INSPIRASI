export const queryKey = ['api'] as const;

export function fetcher<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}
