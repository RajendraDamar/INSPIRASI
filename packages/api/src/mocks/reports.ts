export type Report = {
  id: string;
  createdAt: string;
  title: string;
  description?: string;
};

const base = [
  { id: 'r1', createdAt: new Date().toISOString(), title: 'Sighted whales near reef' },
  { id: 'r2', createdAt: new Date().toISOString(), title: 'High swell reported' },
];

export const mockReports = () => base.slice();
