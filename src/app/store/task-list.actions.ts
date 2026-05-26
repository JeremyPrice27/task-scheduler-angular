import { createAction, props } from '@ngrx/store';
import { Task } from './task-list.state';

export const setTaskListItem = createAction(
  '[Task List] Set Task List Item',
  props<{ task: Partial<Task> }>()
);

export const setData = createAction(
  '[Task List] Set Data',
  props<{ task: Partial<Task> }>()
);

export const removeTask = createAction(
  '[Task List] Remove Task',
  props<{ id: string }>()
);

export const completeTask = createAction(
  '[Task List] Complete Task',
  props<{ id: string }>()
);

export const reopenTask = createAction(
  '[Task List] Reopen Task',
  props<{ id: string }>()
);
