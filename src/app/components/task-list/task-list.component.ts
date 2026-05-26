import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { completeTask, removeTask, reopenTask } from '../../store/task-list.actions';
import { selectTaskList } from '../../store/task-list.selectors';
import './task-list.component.css';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() scrollTop!: () => void;
  @Output() onAddTask = new EventEmitter<Event>();
  @Output() onTaskEdit = new EventEmitter<any>();

  taskList$!: Observable<any[]>;

  constructor(private store: Store<{ taskList: any }>) {}

  ngOnInit(): void {
    this.taskList$ = this.store.select(selectTaskList);
  }

  onCompleteTask(id: string): void {
    this.store.dispatch(completeTask({ id }));
  }

  onReopen(id: string): void {
    this.store.dispatch(reopenTask({ id }));
  }

  onRemoveTask(id: string): void {
    this.store.dispatch(removeTask({ id }));
  }

  onEdit(task: any): void {
    this.onTaskEdit.emit(task);
  }
}
