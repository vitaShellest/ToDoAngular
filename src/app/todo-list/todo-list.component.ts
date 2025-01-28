import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TodoService } from '../todo.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'pl-todo-list',
  imports: [NgFor, DatePipe],
  host: { ngSkipHydration: 'true' },
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  readonly todoService = inject(TodoService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }

  trackById(index: number, todo: any): string | number {
    return todo.id;
  }
  navigateToCreate() {
    this.router.navigate(['/todo-create']);
  }
}
