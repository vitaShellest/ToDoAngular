import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { TodoService } from '../todo.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Sort, MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'pl-todo-list',
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    MatTooltipModule,
    FormsModule,
    MatSort,
    MatSortModule,
  ],
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

  trackById(todo: any): string | number {
    return todo.id;
  }

  navigateToCreate() {
    this.router.navigate(['/todo-create']);
  }
  navigateToEdit(todoId: string) {
    this.router.navigate(['/todo-edit', todoId]);
  }
  navigateToDetails(todoID: string) {
    console.log('toDetail', todoID);
    this.router.navigate(['/todo-details', todoID]);
  }

  sortData(sort: Sort) {
    this.todoService.sortData(sort);
  }
}
