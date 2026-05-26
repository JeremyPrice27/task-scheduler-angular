import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setTaskListItem } from '../../store/task-list.actions';
import './task-form.component.css';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() currentTask: any = null;
  @Output() onClose = new EventEmitter<void>();

  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ taskList: any }>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
      .toISOString()
      .split('T')[0];

    this.taskForm = this.fb.group({
      description: [
        this.currentTask?.description || '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60),
          this.descriptionValidator.bind(this)
        ]
      ],
      dueDate: [
        this.currentTask?.dueDate || '',
        [Validators.required]
      ]
    });

    if (!this.currentTask) {
      this.taskForm.get('dueDate')?.setValidators([Validators.required, this.minDateValidator(today).bind(this)]);
    }
    this.taskForm.get('dueDate')?.updateValueAndValidity();
  }

  descriptionValidator(control: any): { [key: string]: any } | null {
    const value = control.value;
    const regex = /^[A-Za-z0-9,\-\s]*$/;
    return regex.test(value) ? null : { invalidCharacters: true };
  }

  minDateValidator(minDate: string) {
    return (control: any): { [key: string]: any } | null => {
      const value = control.value;
      return value && value < minDate ? { minDate: true } : null;
    };
  }

  getErrorMessage(fieldName: string): string {
    const control = this.taskForm.get(fieldName);
    if (control?.hasError('required')) {
      return fieldName === 'description' ? 'Description is required' : 'Due Date is required';
    }
    if (fieldName === 'description') {
      if (control?.hasError('minlength')) {
        return 'Description must be at least 4 characters long';
      }
      if (control?.hasError('maxlength')) {
        return 'Description must be less than 60 characters long';
      }
      if (control?.hasError('invalidCharacters')) {
        return 'Description contains invalid characters';
      }
    }
    return '';
  }

  onCancel(e: Event): void {
    e.preventDefault();
    this.onClose.emit();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      if (this.currentTask) {
        formData.id = this.currentTask.id;
      }
      this.store.dispatch(setTaskListItem({ task: formData }));
      this.onClose.emit();
    }
  }
}
