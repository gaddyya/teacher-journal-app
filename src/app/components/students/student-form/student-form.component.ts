import { IStudents } from '../../../data/IStudents';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../common/services/local-storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted: boolean = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  public myForm: FormGroup;
  public matcher: any = new MyErrorStateMatcher();

  public currentStudent: IStudents = {
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

  private createForm(): void {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z, а-яА-Я]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z, а-яА-Я]*')]],
      address: [''],
      description: [''],
    });
  }

  private getDataFromField(): void {
    this.currentStudent.firstName = this.myForm.value.firstName;
    this.currentStudent.lastName = this.myForm.value.lastName;
    this.currentStudent.address = this.myForm.value.address;
    this.currentStudent.description = this.myForm.value.description;
  }

  public saveData(): void {
    this.getDataFromField();
    if ((this.currentStudent.firstName !== '') && (this.currentStudent.lastName !== '')) {
      // i use any, because there can come IStudents or ISubjects or ISubjcetTable or etc...
      let globalStudent: IStudents[] = this.localStorageService.getData('students');
      globalStudent.push(this.currentStudent);
      this.localStorageService.addData(globalStudent, 'students');
      this.router.navigate(['students']);
    }
  }

  public ngOnInit(): void {
    this.createForm();
    this.localStorageService.getData('students');
  }
}
