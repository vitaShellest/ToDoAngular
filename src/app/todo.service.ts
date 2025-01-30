import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TodoInterface } from './todo-list/todo-interface';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './utils/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly apiUrl = 'http://localhost:3000/todos';

  readonly http = inject(HttpClient);

  private todos = signal<TodoInterface[]>([]);

  // Auswahloptionen für Dropdowns
  readonly priorities = ['Low', 'Regular', 'High'];
  readonly statuses = ['Backlog', 'In Progress', 'Done'];
  router: any;

  fetchTodos(): void {
    this.http.get<TodoInterface[]>(this.apiUrl).subscribe((data) => {
      this.todos.set(data);
    });
  }

  getTodos(): TodoInterface[] {
    return this.todos();
  }

  getTodoByIdFromSer(id: string) {
    return this.http.get<TodoInterface>(`${this.apiUrl}/${id}`).pipe();
  }

  addTodo(newTodo: TodoInterface): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(this.apiUrl, newTodo).pipe(
      tap((todo) => {
        this.todos.update((oldTodos) => [...oldTodos, todo]);
      })
    );
  }

  // updateTodo(updatedTodo: TodoInterface): void {
  //   this.http
  //     .put<TodoInterface>(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo)
  //     .subscribe((todo) => {
  //       this.todos.update((oldTodos) =>
  //         oldTodos.map((t) => (t.id === todo.id ? todo : t))
  //       );
  //     });
  // }
  updateTodo(updatedTodo: TodoInterface): Observable<TodoInterface> {
    return this.http.put<TodoInterface>(
      `${this.apiUrl}/${updatedTodo.id}`,
      updatedTodo
    );
  }

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  deleteTodo(id: string | number) {
    const todo = this.todos().find((x) => x.id == id);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      enterAnimationDuration: '10ms',
      exitAnimationDuration: '10ms',
      data: {
        messageText: `Möchtest du das Todo '${todo?.title}' wirklich löschen?`,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(`Deleting todo with id: ${id}`);
        this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
          this.todos.update((oldTodos) => oldTodos.filter((t) => t.id !== id));
        });
        this.snackBar.open(`${todo?.title} was deleted`, '', {
          duration: 1000,
        });
      } else {
        this.snackBar.open(`${todo?.title} was not deleted`, '', {
          duration: 1000,
        });
      }
    });
  }
}
