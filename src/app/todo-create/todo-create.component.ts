import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { TodoInterface } from '../todo-list/todo-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  imports: [FormsModule],
})
export class TodoCreateComponent {
  private readonly router = inject(Router);
  private readonly todoService = inject(TodoService);

  // Initiales Todo-Objekt
  todo: TodoInterface = {
    id: '',
    title: '',
    description: '',
    priority: 'Low',
    assigned: '',
    status: 'Backlog',
  };

  get priorities() {
    return this.todoService.priorities;
  }

  get assignees() {
    return this.todoService.assignees;
  }

  get statuses() {
    return this.todoService.statuses;
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 6);
  }

  saveTodo() {
    this.todo.id = this.generateId();
    this.todoService.addTodo(this.todo).subscribe(() => {
      this.router.navigate(['/todo-list']);
    });
  }

  cancel() {
    this.router.navigate(['/todo-list']);
  }
}
