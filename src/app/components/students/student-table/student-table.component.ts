import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Student } from 'src/app/common/entities';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/state/app.state';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.sass'],
})
export class StudentTableComponent implements OnInit {

  public students: Student[];
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'description'];
  // i use any, because i don't know which objcet return MatTableDataSource
  public dataSource: any;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(
    private store: Store<AppState>,
    ) {}

  public setFromStore(): void {
    this.store.select('studentsPage').subscribe(({students}) => {
      this.students = students;
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.sort = this.sort;
    });
  }

  public ngOnInit (): void {
    this.setFromStore();
  }
}
