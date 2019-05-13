import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/state/app.state';
import { DataService } from 'src/app/common/services/data.service';
import { Subject, Student } from 'src/app/common/entities';
import { LoadSubjects, LoadStudents, UpdateSubject } from 'src/app/redux/actions';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.sass']
})
export class SubjectTableComponent implements OnInit {

  public canSave: boolean = false;
  public subjectName: string;
  public subjectTable: any;
  public tableDate: Array<{}> = [];
  public newDate: string = this.dataPipe.transform(new Date, 'MM/dd');
  public subject: Subject;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dataPipe: DatePipe,
    ) {}

  private setSubject(): void {
    this.route.params.subscribe( ({subjects}) => {
      this.subjectName = subjects;
    });
  }

  private setStudentsName(): void {

    if (this.store.source._value.studentsPage.students.length === 0 || this.store.source._value.subjectsPage.subjects.length === 0) {
      this.dataService.getStudentsFromHttp().subscribe((data) => {
        this.store.dispatch(new LoadStudents(<Student[]>data));
      });
      this.dataService.getSubjectsFromHttp().subscribe((data) => {
        this.store.dispatch(new LoadSubjects(<Subject[]>data));
      });
    }

    this.store.select('studentsPage').subscribe(({students}) => {
      this.subjectTable = students;
    }).unsubscribe();

    this.store.select('subjectsPage').subscribe(({subjects}) => {
      this.subject = subjects.filter( subject => subject['subjectName'] === this.subjectName )[0];
      if (this.subject.journal.length === 0) {
      this.subject.journal.push({
        date: this.newDate,
        marks: {}
      });
    }
    }).unsubscribe();
  }

  private checkDuplicate(array: any): boolean {
    return new Set(array).size === array.length;
  }

  public addDate(): void {
    this.subject.journal.push({
      date: this.newDate,
      marks: {}
    });
  }

  public saveSubjectTable(): void {
    let checkDate: string[] = [];
    this.subject.journal.forEach(({date}) => {
      checkDate = [...checkDate, date];
    });

    if (this.checkDuplicate(checkDate)) {
      this.canSave = true;
      this.dataService.updateSubjectThroughHttp(this.subject.id, this.subject).subscribe((data) => {
        this.store.dispatch(new UpdateSubject(<Subject>data));
        });
    }
  }

  public initializeSubjectTable(): void {
    this.setSubject();
    this.setStudentsName();
  }

  public ngOnInit(): void {
    this.initializeSubjectTable();
  }
}
