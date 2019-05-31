import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DialogData {
  name: string;
  date?: string;
  subjectName?: string;
}

@Component({
  selector: 'app-warning-pop-up',
  templateUrl: './warning-pop-up.component.html',
  styleUrls: ['./warning-pop-up.component.sass']
})
export class WarningPopUpComponent {

  constructor(
    public dialogRef: MatDialogRef<WarningPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
