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
import { WarningPopUpComponent } from '../../warning-pop-up/warning-pop-up.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.sass']
})
export class SubjectFormComponent implements OnInit {

  public subjectName: string[] = [];
  public canSave: boolean;
  public subject: string = ' ';
  public addSubjectForm: FormGroup;
  public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  public newDate: string = this.dataPipe.transform(new Date, 'MM/dd');

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe,
    private dialog: MatDialog,
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
    this.store.select('subjectsPage').subscribe(({subjects}) => {
      subjects.forEach(({subjectName}) => this.subjectName.push(subjectName));
    });
  }

  public checkDuplicate(subject: string): boolean {
    return this.subjectName.includes(subject);
  }

  public checkCanSave(): void {
    if (
      (!this.checkDuplicate(this.addSubjectForm.value.subjectName)) && (this.addSubjectForm.value.subjectName) &&
      (this.addSubjectForm.value.teacher)) {
        this.canSave = true;
      } else { this.canSave = false; }
  }

  public openDialog(): void {
    const dialogRef: any = this.dialog.open(WarningPopUpComponent, {
      width: '250px',
      data: { subjectName: this.addSubjectForm.value.subjectName }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.addSubjectForm.get('subjectName').setValue(result);
      }
    });
  }

  public saveData(): void {
    this.checkCanSave();
    if (this.canSave) {
        let subject: Subject = new Subject(
          this.addSubjectForm.value.subjectName,
          this.addSubjectForm.value.teacher,
          this.addSubjectForm.value.room,
          this.addSubjectForm.value.description,
        );
        this.dataService.addSubjectThroughHttp(subject).subscribe((data) => this.store.dispatch(new AddSubject(<Subject>data)));
        this.router.navigate(['subjects']);
    } else {
      this.openDialog();
    }
  }
}
