import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/common/services/data.service';
import { LocalStorageService } from 'src/app/common/services/local-storage.service';
import { DatePipe } from '@angular/common';
import ISubjectTable from 'src/app/data/ISubjectsTable';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.sass']
})
export class SubjectTableComponent implements OnInit {

  public subject: string;
  public studentsName: object[];
  public subjectTable: ISubjectTable[];
  public journal: Array<{}> = [];
  public newDate = this.dataPipe.transform(new Date, 'MM/dd');

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private localStorage: LocalStorageService,
    private dataPipe: DatePipe) {}

  protected setSubject(): void {
    this.route.params.subscribe( data => {
      this.subject = data.subjects;
    });
  }

  protected setStudentsName(): void {
    this.dataService.getStudentsFromHttp().subscribe(students => {
      this.studentsName = students.map(student => {
      return {
        firstName: student.firstName,
        lastName: student.lastName,
        averageMark: undefined,
        table: [{
          date: this.newDate,
          mark: undefined,
          }],
        };
      });
      this.journal.push({ date: this.newDate});
      this.subjectTable = <ISubjectTable[]>this.studentsName;
      }
    );
  }

  protected setSubjectTable(): void {
    this.subjectTable = <ISubjectTable[]>this.studentsName;
  }

  public addDate(): void {
    this.journal.push({ date: this.newDate});
    this.subjectTable.forEach(subject => subject['table'].push({
      date: this.newDate,
      mark: undefined,
    }));
  }

  public showSubjectTable(): void {
    this.subjectTable.forEach(element => element.table.forEach((diary, index) => diary.date = <string>this.journal[index]['date']));
    this.localStorage.addData(this.subjectTable, this.subject);
    console.log(this.subjectTable);
  }

  public ngOnInit(): void {
    this.setSubject();
    this.setStudentsName();
  }
}
