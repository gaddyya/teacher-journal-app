import { Component } from '@angular/core';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent {

  protected INPUTNAMES: any[] = ['*First Name',  '*Last Name', 'Address'];

  constructor() { }
}
