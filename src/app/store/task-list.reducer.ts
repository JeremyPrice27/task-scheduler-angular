import { createReducer, on } from '@ngrx/store';
import { TaskListState } from './task-list.state';
import { setData, removeTask, completeTask, reopenTask } from './task-list.actions';
import { v4 as uuidv4 } from 'uuid';

const initialState: TaskListState = {
  data: [
    { id: '001', description: 'Import Angular components', dueDate: '2025-02-15', completed: true },
    { id: '002', description: 'Build a task table component', dueDate: '2025-03-01', completed: true },
    { id: '003', description: 'Implement NgRx store', dueDate: '2025-03-10', completed: false },
    { id: '004', description: 'Refactor Reactive Forms', dueDate: '2025-01-07', completed: false }
  ],
  status: 'idle',
  error: null
};

export const taskListReducer = createReducer(
  initialState,
  on(setData, (state, { task }) => {
    if (task.id) {
      const index = state.data.findIndex(t => t.id === task.id);
      if (index !== -1) {
        return {
          ...state,
          data: [
            ...state.data.slice(0, index),
            task,
            ...state.data.slice(index + 1)
          ]
        };
      }
    } else {
      const newTask = { ...task, id: uuidv4() };
      return {
        ...state,
        data: [...state.data, newTask]
      };
    }
    return state;
  }),
  on(removeTask, (state, { id }) => {
    const index = state.data.findIndex(t => t.id === id);
    if (index !== -1) {
      return {
        ...state,
        data: [...state.data.slice(0, index), ...state.data.slice(index + 1)]
      };
    }
    return state;
  }),
  on(completeTask, (state, { id }) => {
    const updatedData = state.data.map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    return {
      ...state,
      data: updatedData
    };
  }),
  on(reopenTask, (state, { id }) => {
    const updatedData = state.data.map(task =>
      task.id === id ? { ...task, completed: false } : task
    );
    return {
      ...state,
      data: updatedData
    };
  })
);
