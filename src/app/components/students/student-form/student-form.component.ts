import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  protected currentStudent: object = [{
    id: Math.floor(Math.random() * 100),
    firstName: '',
    lastName: '',
    address: '',
    description: ''
  }];
  public name: string;

  constructor(private localStorageService: LocalStorageService) { }

  private getDataFromLocalSerivice(): object {
    const students: string = this.localStorageService.getItem('students');
    return this.localStorageService.objectifyItem('students');
  }

  public saveData(): void {
    const globalStudent: any = this.getDataFromLocalSerivice();
    const newStudent: any = globalStudent.push(this.currentStudent);
    this.localStorageService.setItem('students', this.localStorageService.stringifyItem(newStudent));
    const student: any = this.localStorageService.getItem('students');
    console.log(typeof globalStudent);
    console.log(typeof newStudent);
    console.log(this.currentStudent);
    console.log(newStudent);
  }

  public ngOnInit(): void {
    console.log(this.getDataFromLocalSerivice());
  }

}
