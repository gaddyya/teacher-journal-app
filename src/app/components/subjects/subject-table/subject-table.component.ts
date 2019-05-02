import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/common/services/data.service';
import { LocalStorageService } from 'src/app/common/services/local-storage.service';
import { DatePipe } from '@angular/common';
import { ISubjectTable } from 'src/app/data/ISubjectsTable';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.sass']
})
export class SubjectTableComponent implements OnInit {

  public canSave: boolean = false;
  public subject: string;
  public studentsName: object[];
  public subjectTable: ISubjectTable[];
  public tableDate: Array<{}> = [];
  public newDate: string = this.dataPipe.transform(new Date, 'MM/dd');

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private localStorage: LocalStorageService,
    private dataPipe: DatePipe) {}

  private setSubject(): void {
    this.route.params.subscribe( data => {
      this.subject = data.subjects;
    });
  }

  private setStudentsNameFromDataService(): void {
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
      this.tableDate.push({ date: this.newDate});
      this.subjectTable = <ISubjectTable[]>this.studentsName;
      }
    );
  }

  private setSubjectTable(): void {
    this.subjectTable = <ISubjectTable[]>this.studentsName;
  }

  private setSubjectTableFromLocalStorage(): void {
    this.subjectTable = this.localStorage.getData(this.subject);
    this.tableDate = this.subjectTable[0].table.map(el => el);
  }

  private checkDuplicate(array: any): boolean {
    let currentArray: [] = [];
    if ((typeof array[0].date) === 'string') {
      currentArray = array.map(el => el.date);
    }
    return new Set(currentArray).size === currentArray.length;
  }

  public addDate(): void {
    this.tableDate.push({date: this.newDate});
    this.subjectTable.forEach(subject => {
      subject['table'].push({
        date: this.newDate,
        mark: undefined,
      });
    });
  }

  public saveSubjectTable(): void {
    if (this.checkDuplicate(this.tableDate)) {
      this.subjectTable.forEach(element => element.table.forEach((diary, index) => {
        diary.date = <string>this.tableDate[index]['date'];
      }));
      this.localStorage.addData(this.subjectTable, <string>this.subject);
      this.canSave = true;
    }
    console.log(this.canSave);
  }

  public initializeSubjectTable(): void {
    if (this.localStorage.isElementOfLocal(this.subject)) {
      this.setSubjectTableFromLocalStorage();
    } else {
      this.setStudentsNameFromDataService();
      this.setSubjectTable();
    }
  }

  public ngOnInit(): void {
    this.setSubject();
    this.initializeSubjectTable();
  }
}
