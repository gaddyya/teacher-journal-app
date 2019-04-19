import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/common/services/data.service';
import { LocalStorageService } from 'src/app/common/services/local-storage.service';

interface ISubjectTable {
  firstName: string;
  lastName: string;
  table: [{
    date: '',
    mark: 0
  }];
}

interface IDate {
  date: string;
  mark: number;
}

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.sass']
})
export class SubjectTableComponent implements OnInit {

  public subject: string;
  public studentsName: object[];
  public subjectTable: object[] = [{
    firstName: '',
    lastName: '',
    table: [{
      date: '',
      mark: 0,
    }]
  }];
  public currentDate: IDate[] = [{
    date: '',
    mark: 0,
  }];

  constructor(private route: ActivatedRoute, private dataService: DataService, private localStorage: LocalStorageService) {}

  protected setSubject(): void {
    this.route.params.subscribe( data => {
      this.subject = data.subjects;
    });
  }

  protected setStudentsName(): void {
    this.dataService.getStudents().subscribe(students => this.studentsName = students.map(student => {
      return {
        firstName: student.firstName,
        lastName: student.lastName,
      };
    }));
  }

  protected setSubjectTable(): void {
    this.subjectTable = JSON.parse(JSON.stringify(this.studentsName));
  }

  protected initializeSubjectTable(): void {
    this.subjectTable.forEach(subjects => <ISubjectTable>subjects['table']);
  }

  public addDataToSubjectTable(): void {
    console.log(this.subjectTable);
    this.subjectTable.forEach(subject => {
      console.log('---------------------------------------');
      console.log(Array.isArray(subject['table']));
      console.log(Array.isArray(this.currentDate));
      subject['table'].push(this.currentDate);
    });
  }

  public showSubjectTable(): void {
    console.log(this.subjectTable);
  }

  public ngOnInit(): void {
    this.setSubject();
    //this.setStudentsName();
    //this.setSubjectTable();
    //this.initializeSubjectTable();
  }
}
