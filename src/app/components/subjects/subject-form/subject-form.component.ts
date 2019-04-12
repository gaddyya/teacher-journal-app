import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.sass']
})
export class SubjectFormComponent {

  public inputNames: string[] = ['*Subject',  '*Teacher Name', 'Cabinet'];

  constructor() { }
}
