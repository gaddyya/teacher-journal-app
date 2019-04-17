import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  protected currentStudent: object = {
    id: Math.floor(Math.random() * 100),
    firstName: '',
    lastName: '',
    address: '',
    description: ''
  };

  constructor(private localStorageService: LocalStorageService) { }

  public saveData(): void {
    let globalStudent: object[] = this.localStorageService.getData('students');
    globalStudent.push(this.currentStudent);
    this.localStorageService.addData(globalStudent, 'students');

  }

  public ngOnInit(): void {
    this.localStorageService.getData('students');
  }

}
