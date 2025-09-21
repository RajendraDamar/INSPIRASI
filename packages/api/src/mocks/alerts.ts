export type Alert = {
  id: string;
  createdAt: string;
  channel: 'webpush' | 'fcm';
  title: string;
  body?: string;
};

const now = new Date().toISOString();

export const mockAlerts = (): Alert[] => [
  { id: 'a1', createdAt: now, channel: 'webpush', title: 'High wind warning', body: 'Gale-force winds expected in 3 hours.' },
  { id: 'a2', createdAt: now, channel: 'fcm', title: 'Tide advisory', body: 'Spring tides higher than usual.' },
];
