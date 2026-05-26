import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskListState } from './task-list.state';

const selectTaskListFeature = createFeatureSelector<TaskListState>('taskList');

export const selectTaskListData = createSelector(
  selectTaskListFeature,
  (state: TaskListState) => state.data
);

export const selectTaskList = createSelector(
  selectTaskListData,
  (data) => {
    const sortedTasks = [...data];
    sortedTasks.sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    return sortedTasks;
  }
);
