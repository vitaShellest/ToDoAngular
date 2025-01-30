import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { TodoInterface } from '../todo-list/todo-interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'pl-todo-details',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly todoService = inject(TodoService);
  private readonly route = inject(ActivatedRoute);

  todo: TodoInterface = {
    id: '',
    title: '',
    description: '',
    date: new Date(),
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

  goBack() {
    this.router.navigate(['/todo-list']);
  }
}
