import IStudent from '../../../data/IStudents';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../common/services/local-storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  public myForm: FormGroup

  public currentStudent: IStudent = {
    id: Math.floor(Math.random() * 100),
    firstName: '',
    lastName: '',
    address: '',
    description: ''
  };

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  public saveData(): void {
    if (this.currentStudent.firstName !== '') {
      let globalStudent: object[] = this.localStorageService.getData('students');
      globalStudent.push(this.currentStudent);
      this.localStorageService.addData(globalStudent, 'students');
      this.router.navigate(['students']);
    }
  }

  public onSubmit(form: FormGroup) {
    this.currentStudent.firstName = this.myForm.value.firstName;
    this.currentStudent.lastName = this.myForm.value.lastName;
    this.currentStudent.address = this.myForm.value.address;
    this.currentStudent.description = this.myForm.value.description;
  }

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern('[a-zA-Z, а-яА-Я]*')]],
      lastName: ["", [Validators.required, Validators.pattern('[a-zA-Z, а-яА-Я]*')]],
      address: [""],
      description: [""],
    })
    this.localStorageService.getData('students');
  }
}
