import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import './app.component.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  addTask = false;
  currentTask: any = null;

  ngOnInit(): void {}

  scrollTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onAddTask(e: Event): void {
    e.preventDefault();
    this.addTask = true;
    this.currentTask = null;
    this.scrollTop();
  }

  onTaskFormClose(): void {
    this.addTask = false;
    this.currentTask = null;
  }

  onTaskEdit(task: any): void {
    this.addTask = true;
    this.currentTask = task;
    this.scrollTop();
  }
}
