import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo-list',
    loadComponent: () =>
      import('./todo-list/todo-list.component').then(
        (m) => m.TodoListComponent
      ),
  },
  {
    path: 'todo-create',
    loadComponent: () =>
      import('./todo-create/todo-create.component').then(
        (m) => m.TodoCreateComponent
      ),
  },
  {
    path: 'todo-edit/:id',
    loadComponent: () =>
      import('./todo-edit/todo-edit.component').then(
        (m) => m.TodoEditComponent
      ),
  },
  {
    path: 'todo-details/:id',
    loadComponent: () =>
      import('./todo-details/todo-details.component').then(
        (m) => m.TodoDetailsComponent
      ),
  },
  {
    path: 'user-management',
    loadComponent: () =>
      import('./user-management/user-management.component').then(
        (m) => m.UserManagementComponent
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
];
