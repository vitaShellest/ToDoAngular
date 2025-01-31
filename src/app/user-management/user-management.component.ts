import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { role, UserInterface } from '../user-management/user-interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'pl-user-management',
  imports: [NgFor, FormsModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  readonly loginService: LoginService = inject(LoginService);
  private readonly router = inject(Router);
  dialog = inject(MatDialog);

  userForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    role: new FormControl<role>('User', {
      nonNullable: true,
      validators: Validators.required,
    }),
    active: new FormControl(true, {
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    this.loginService.getUsers();
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser = { id: this.generateId(), ...this.userForm.getRawValue() };
      this.loginService.addUser(newUser);
      this.userForm.reset({ role: 'User', active: true });
      this.loginService.getUsers();
    }
  }
  navigateToEdit(user: UserInterface) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: { id: user.id },
    });

    dialogRef.afterClosed().subscribe((result: UserInterface) => {
      if (result) {
        this.loginService.updateUser({ ...user, ...result });
      }
    });
  }
}
