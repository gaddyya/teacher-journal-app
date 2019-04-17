import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../../../common/services/data.service';
import IStudents from '../../../data/IStudents';
import { LocalStorageService } from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.sass'],
  providers: [ DataService, LocalStorageService ],
})
export class StudentTableComponent implements OnInit {

  public students: IStudents[];
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'description'];
  public dataSource: any;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(private dataService: DataService, private localStorageService: LocalStorageService) { }

  protected setStudents(): void {
    this.dataService.getStudents().subscribe(students => this.students = students);
  }

  protected setDataSource(): void {
    this.dataSource = new MatTableDataSource(this.students);
  }

  protected saveDataToLocalStorage(): void {
    this.localStorageService.addData(this.students, 'students');
  }

  protected setFromLocalStudents(): void {
    this.students = <IStudents[]>this.localStorageService.getData('students');
  }

  public initializeTable(): void {
    if ( this.localStorageService.length() === 0 ) {
      this.setStudents();
      this.saveDataToLocalStorage();
      } else {this.setFromLocalStudents();
    }
  }

  public ngOnInit (): void {
    this.initializeTable();
    this.setDataSource();
    this.dataSource.sort = this.sort;
  }
}
