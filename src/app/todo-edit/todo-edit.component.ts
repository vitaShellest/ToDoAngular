import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { TodoInterface } from '../todo-list/todo-interface';

@Component({
  selector: 'pl-todo-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.scss',
})
export class TodoEditComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly todoService = inject(TodoService);
  private readonly route = inject(ActivatedRoute);

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

  get statuses() {
    return this.todoService.statuses;
  }

  ngOnInit(): void {
    const todoId = this.route.snapshot.paramMap.get('id');
    if (todoId) {
      this.todoService.getTodoByIdFromSer(todoId).subscribe((todo) => {
        if (todo) {
          this.todo = { ...todo };
        }
      });
    }
  }

  saveTodo() {
    this.todoService.updateTodo(this.todo).subscribe(() => {
      this.router.navigate(['/todo-list']);
    });
  }

  cancel() {
    this.router.navigate(['/todo-list']);
  }
}
