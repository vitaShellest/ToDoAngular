import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'pl-delete-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent implements OnInit {
  ngOnInit(): void {
    if (this.data.messageText) this.messageText.set(this.data.messageText);
    if (this.data.noText) this.noText.set(this.data.noText);
    if (this.data.yesText) this.yesText.set(this.data.yesText);
    if (this.data.titleText) this.titleText.set(this.data.titleText);
  }
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  yesText = signal('Ja');
  noText = signal('Nein');
  messageText = signal('Möchtest du das wirklich löschen.');
  titleText = signal('Ausgewahl löschen');

  data = inject<DeleteDialogData>(MAT_DIALOG_DATA);
}

export interface DeleteDialogData {
  yesText?: string;
  noText?: string;
  messageText?: string;
  titleText?: string;
}
