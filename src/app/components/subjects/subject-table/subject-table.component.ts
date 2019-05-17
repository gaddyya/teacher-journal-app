import { AverageMarksPipe } from './../../../common/pipes/average-marks.pipe';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/state/app.state';
import { DataService } from 'src/app/common/services/data.service';
import { Subject, Student } from 'src/app/common/entities';
import { UpdateSubject } from 'src/app/redux/actions';
import { MatDialog } from '@angular/material';
import { WarningPopUpComponent } from '../../warning-pop-up/warning-pop-up.component';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.sass']
})
export class SubjectTableComponent implements OnInit {

  public canSave: boolean = false;
  public subjectName: string;
  public students: Student[];
  public averageMarks: object = {};
  public tableDate: Array<{}> = [];
  public newDate: string = this.dataPipe.transform(new Date, 'MM/dd');
  public subject: Subject;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dataPipe: DatePipe,
    private average: AverageMarksPipe,
    private dialog: MatDialog
    ) {}

  private setSubjectName(): void {
    this.route.params.subscribe( ({subjects}) => {
      this.subjectName = subjects;
    });
  }

  private getDataFromStore(): void {
    this.store.select('studentsPage').subscribe(({students}) => {
      this.students = students;
      this.store.select('subjectsPage').subscribe(({subjects}) => {
        this.subject = subjects.filter( subject => subject['subjectName'] === this.subjectName )[0];
        if (this.subject.journal.length === 0) {
          this.subject.journal.push({
            date: this.newDate,
            marks: {}
          });
        }
      });
    });
  }

  private checkDuplicate(): void {
    let checkDate: string[] = [];
    this.subject.journal.forEach(({date}) => {
      checkDate = [...checkDate, date];
    });
    if (new Set(checkDate).size === checkDate.length) {
      this.canSave = true;
    } else { this.canSave = false; }
  }

  public calculateAverageMark(): void {
    this.students.forEach((el, i) => {
      this.subject.averageMarks[el.index] = this.average.transform(this.averageMarks[el.index]);
    });
  }

  public addDate(): void {
    this.subject.journal.push({
      date: this.newDate,
      marks: {}
    });
  }

  public deleteLastDate(): void {
    this.subject.journal.pop();
  }

  public saveSubject(): void {

    this.checkDuplicate();
    this.students.forEach(el => {
      let currentMarks: Array<number> = [];
      this.subject.journal.forEach(({marks}) => {
        if ((marks[el.index] !== '') && (marks[el.index] !== undefined)) {
          currentMarks = [...currentMarks, +marks[el.index]];
        }
      });
      this.averageMarks[el.index] = currentMarks;
    });

    this.calculateAverageMark();

    if (this.canSave) {
      this.dataService.updateSubjectThroughHttp(this.subject.id, this.subject).subscribe((data) => {
      this.store.dispatch(new UpdateSubject(<Subject>data));
      });
    } else { this.openDialog(); }
  }

  public openDialog(): void {
    let lastIndex: number = (this.subject.journal.length - 1);
    const dialogRef: any = this.dialog.open(WarningPopUpComponent, {
      width: '250px',
      data: {name: this.subject.teacher, date: this.subject.journal[lastIndex].date }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.subject.journal[lastIndex].date = result;
      }
    });
  }

  public initializeSubjectTable(): void {
    this.setSubjectName();
    this.getDataFromStore();
  }

  public ngOnInit(): void {
    this.initializeSubjectTable();
  }
}
