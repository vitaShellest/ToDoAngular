export interface TodoInterface {
  id: string | number;
  title: string;
  date?: Date;
  description: string;
  status: status;
  priority: priority;
  assigned: string;
}

type status = 'Backlog' | 'In Progress' | 'Done';
type priority = 'Low' | 'Regular' | 'High';
