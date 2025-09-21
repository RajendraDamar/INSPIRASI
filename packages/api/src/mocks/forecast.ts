export type ForecastType = 'wave' | 'wind' | 'tide' | 'weather';

export type ForecastPoint = {
  time: string; // ISO
  value: number;
};

export type Forecast = {
  type: ForecastType;
  points: ForecastPoint[];
};

export const mockForecast = (type: ForecastType): Forecast => {
  const now = Date.now();
  const points = Array.from({ length: 24 }).map((_, i) => ({
    time: new Date(now + i * 3600000).toISOString(),
    value: Math.round(Math.random() * 100) / 10,
  }));
  return { type, points };
};
