export interface TodoInterface {
  id: string | number;
  title: string;
  date?: Date;
  description: string;
  status: 'Backlog' | 'In Progress' | 'Done';
  priority: 'Low' | 'Regular' | 'High';
  assigned: string;
}
