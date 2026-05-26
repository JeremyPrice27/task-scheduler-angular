export interface Task {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export interface TaskListState {
  data: Task[];
  status: 'idle' | 'loading' | 'error';
  error: string | null;
}
