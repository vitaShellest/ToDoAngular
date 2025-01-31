import { Component, Inject, NgModule } from '@angular/core';
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

@Component({
  selector: 'pl-user-edit-dialog',
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.scss',
})
export class UserEditDialogComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface
  ) {
    this.userForm = new FormGroup({
      name: new FormControl(data.name, [Validators.required]),
      email: new FormControl(data.email, [
        Validators.required,
        Validators.email,
      ]),
      role: new FormControl(data.role, [Validators.required]),
      active: new FormControl(data.active),
    });
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
