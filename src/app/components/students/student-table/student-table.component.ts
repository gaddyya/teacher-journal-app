import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import Student from '../../../data/students.json';
import IStudents from './IStudents';

const STUDENTS: IStudents[] = Student;

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.sass']
})
export class StudentTableComponent implements OnInit {

  public displayedColumns: string[] = ['_id', 'firstName', 'lastName', 'adress', 'description'];
  public dataSource: any = new MatTableDataSource(STUDENTS);

  @ViewChild(MatSort) public sort: MatSort;

  public ngOnInit (): void {
    this.dataSource.sort = this.sort;
  }
}
