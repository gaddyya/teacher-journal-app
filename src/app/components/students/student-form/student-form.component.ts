import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../common/services/local-storage.service';
import { Router } from '@angular/router';
import IStudent from '../../../data/IStudents';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  public currentStudent: IStudent = {
    id: Math.floor(Math.random() * 100),
    firstName: '',
    lastName: '',
    address: '',
    description: ''
  };

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  public saveData(): void {
    if (this.currentStudent.firstName !== '') {
      let globalStudent: object[] = this.localStorageService.getData('students');
      globalStudent.push(this.currentStudent);
      this.localStorageService.addData(globalStudent, 'students');
      this.router.navigate(['students']);
    }
  }

  public ngOnInit(): void {
    this.localStorageService.getData('students');
  }
}
