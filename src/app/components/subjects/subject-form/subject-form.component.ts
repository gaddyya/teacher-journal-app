import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.sass']
})
export class SubjectFormComponent implements OnInit {

  @Output() public INPUTNAMES: any[] = ['*Subject',  '*Teacher Name', 'Cabinet'];

  constructor() { }

  public ngOnInit(): void {
    return;
  }

}
