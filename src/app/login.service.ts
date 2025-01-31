import { inject, Injectable, signal } from '@angular/core';
import { UserInterface } from './user-management/user-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:3000/users';

  readonly http = inject(HttpClient);

  private users = signal<UserInterface[]>([]);

  private loadUsers() {
    this.http.get<UserInterface[]>(this.apiUrl).subscribe((data) => {
      this.users.set(data);
    });
  }

  getUsers(): UserInterface[] {
    if (this.users().length === 0) {
      this.loadUsers();
    }
    return this.users();
  }

  addUser(user: UserInterface) {
    this.http
      .post<UserInterface>(this.apiUrl, user)
      .subscribe((newUser) => this.users.set([...this.users(), newUser]));
  }

  updateUser(user: UserInterface) {
    this.http
      .put<UserInterface>(`${this.apiUrl}/${user.id}`, user)
      .subscribe(() => {
        const updateUser = this.users().map((u) =>
          u.id === user.id ? user : u
        );
        this.users.set(updateUser);
      });
  }

  deletedUser(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.users.set(this.users().filter((user) => user.id !== id));
    });
  }
}
