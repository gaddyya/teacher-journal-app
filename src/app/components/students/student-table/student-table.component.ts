import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import Student from '../../../data/students.json'

export interface IStudents {
  id: number;
  firstName: string;
  lastName: string;
  adress: string;
  description: string;
}

const STUDENTS: IStudents[] = Student;

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.sass']
})
export class StudentTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'adress', 'description'];
  dataSource = new MatTableDataSource(STUDENTS);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
