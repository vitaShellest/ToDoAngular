import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { TodoInterface } from './todo-list/todo-interface';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './utils/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort, MatSortModule } from '@angular/material/sort';

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

  _filter = signal<Partial<TodoInterface>>({});

  showDoubleArrow = true;
  sortActive = false;

  fetchTodos(): void {
    this.http.get<TodoInterface[]>(this.apiUrl).subscribe((data) => {
      this.todos.set(data);
    });
  }

  getTodos(): TodoInterface[] {
    return this.todos();
  }
  readonly todosFiltered = computed(() => {
    let filt = this._filter();

    function isMatch(text: string, filter?: string) {
      if (!filter || filter.length === 0) return true;
      return filter === text;
    }
    return this?.todos().filter((x) => {
      return (
        isMatch(x.status, filt.status) && isMatch(x.priority, filt.priority)
      );
    });
  });

  updateFilter(newFilter?: Partial<TodoInterface>) {
    this._filter.update(
      (x) => ({ ...x, ...newFilter } as Partial<TodoInterface>)
    );
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

  sortData(sort: Sort) {
    const data = this.todos().slice();
    if (!sort.active || sort.direction === '') {
      this.todos.set(data);
      this.showDoubleArrow = true;
      this.sortActive = false;
      return;
    }
    this.showDoubleArrow = false;
    this.sortActive = true;
    this.todos.set(
      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'date':
            return compare(a.date, b.date, isAsc);
          default:
            return 0;
        }
      })
    );
  }
}
function compare(a: Date | undefined, b: Date | undefined, isAsc: boolean) {
  if (a === undefined || b === undefined) {
    return 0;
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
