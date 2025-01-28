import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TodoInterface } from './todo-list/todo-interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly apiUrl = 'http://localhost:3000/todos';

  readonly http = inject(HttpClient);

  private todos = signal<TodoInterface[]>([]);

  // Auswahloptionen für Dropdowns
  readonly priorities = ['Low', 'Regular', 'High'];
  readonly assignees = ['Peter', 'Frank', 'Hans'];
  readonly statuses = ['Backlog', 'In Progress', 'Done'];

  fetchTodos(): void {
    this.http.get<TodoInterface[]>(this.apiUrl).subscribe((data) => {
      this.todos.set(data);
    });
  }

  getTodos(): TodoInterface[] {
    return this.todos();
  }

  addTodo(newTodo: TodoInterface): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(this.apiUrl, newTodo).pipe(
      tap((todo) => {
        this.todos.update((oldTodos) => [...oldTodos, todo]);
      })
    );
  }

  updateTodo(updatedTodo: TodoInterface) {
    this.http
      .put<TodoInterface>(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo)
      .subscribe((todo) => {
        this.todos.update((oldTodos) =>
          oldTodos.map((t) => (t.id === todo.id ? todo : t))
        );
      });
  }

  deleteTodo(id: string | number) {
    console.log(`Deleting todo with id: ${id}`);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.todos.update((oldTodos) => oldTodos.filter((t) => t.id !== id));
    });
  }
}
