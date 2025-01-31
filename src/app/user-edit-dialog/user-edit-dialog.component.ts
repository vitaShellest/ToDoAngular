import { Component, inject, Inject, NgModule, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserInterface } from '../user-management/user-interface';
import { LoginService } from '../login.service';

@Component({
  selector: 'pl-user-edit-dialog',
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.scss',
})
export class UserEditDialogComponent implements OnInit {
  userForm!: FormGroup;
  data = inject<UserInterface>(MAT_DIALOG_DATA);

  readonly dialogRef = inject(MatDialogRef<UserEditDialogComponent>);
  readonly loginService = inject(LoginService);

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('User', [Validators.required]),
      active: new FormControl(true),
    });

    const userId = this.data.id;
    if (userId) {
      this.loginService.getUserById(userId).subscribe((user) => {
        if (user) {
          this.userForm.patchValue(user);
        }
      });
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
