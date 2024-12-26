import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-dialog-add-menu-item',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './dialog-add-menu-item.component.html',
  styleUrl: './dialog-add-menu-item.component.css'
})
export class DialogAddMenuItemComponent {
  constructor(public dialogRef: MatDialogRef<DialogAddMenuItemComponent>) {}

  onNoClick(): void {
    this.dialogRef.close('No');
  }

  onOkClick(): void {
    this.dialogRef.close('Yes');
  }
}
