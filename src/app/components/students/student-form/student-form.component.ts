import { Student } from './../../../common/entities/Student.model';
import { MyErrorStateMatcher } from 'src/app/common/errorCatcher/myErrorCatcher';
import { DataService } from 'src/app/common/services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddStudent } from 'src/app/redux/actions';
import { AppState } from 'src/app/redux/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  public addStudentForm: FormGroup;
  public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
    ) { }

  private createForm(): void {
    this.addStudentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z, а-яА-Я]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z, а-яА-Я]*')]],
      address: [''],
      description: [''],
    });
  }

  public saveData(): void {
    const student: Student = new Student(
      this.addStudentForm.value.firstName,
      this.addStudentForm.value.lastName,
      this.addStudentForm.value.address,
      this.addStudentForm.value.description,
      );

    if ((this.addStudentForm.value.firstName !== '') && (this.addStudentForm.value.lastName !== '')) {
      this.dataService.addStudentThroughHttp(student).subscribe( (data) => {
        this.store.dispatch(new AddStudent(<Student>data));
      });
      this.router.navigate(['students']);
    }
  }

  public ngOnInit(): void {
    this.createForm();
  }
}
