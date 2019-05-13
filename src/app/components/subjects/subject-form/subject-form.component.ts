import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/common/errorCatcher/myErrorCatcher';
import { DataService } from 'src/app/common/services/data.service';
import { Subject } from 'src/app/common/entities';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppState } from 'src/app/redux/state';
import { Store } from '@ngrx/store';
import { AddSubject } from 'src/app/redux/actions';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.sass']
})
export class SubjectFormComponent implements OnInit {

  public addSubjectForm: FormGroup;
  public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  public newDate: string = this.dataPipe.transform(new Date, 'MM/dd');

  constructor(
      private router: Router,
      private store: Store<AppState>,
      private dataService: DataService,
      private formBuilder: FormBuilder,
      private dataPipe: DatePipe,
  ) {}

  private createForm(): void {
    this.addSubjectForm = this.formBuilder.group({
        subjectName: ['', [Validators.required, Validators.pattern('[a-zA-Z, а-яА-Я]*')]],
        teacher: ['', [Validators.required, Validators.pattern('[a-zA-Z, а-яА-Я]*')]],
        room: ['', Validators.pattern('[0-9]*')],
        description: [''],
    });
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public saveData(): void {
    let subject: Subject = new Subject(
      this.addSubjectForm.value.subjectName,
      this.addSubjectForm.value.teacher,
      this.addSubjectForm.value.room,
      this.addSubjectForm.value.description,
      );
    this.dataService.addSubjectThroughHttp(subject).subscribe((data) => this.store.dispatch(new AddSubject(<Subject>data)));
    this.router.navigate(['subjects']);
  }

}
