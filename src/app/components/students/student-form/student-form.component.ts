import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  public INPUTNAMES: any = ['First Name',  'Last Name', 'Address', 'Description'];

  constructor() { }

  public ngOnInit(): void {
    return;
  }

}
