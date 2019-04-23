import { Component } from '@angular/core';
import Subject from '../../../data/subjects.json';
import { LocalStorageService } from 'src/app/common/services/local-storage.service.js';
import { DataService } from '../../../common/services/data.service';
import ISubject from '../../../data/ISubjects';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.sass']
})
export class SubjectPageComponent {

  public subjectsName: string[];
  public subjects: ISubject[];

  constructor(private dataSource: DataService, private localStorageService: LocalStorageService) { }

  protected setSubjects(): void {
    this.dataSource.getSubject().subscribe(subjects => this.subjects = subjects);
  }

  protected saveDataToLocalStorage(): void {
    this.localStorageService.addData(this.subjects, 'subjects');
  }

  protected setFromLocalStudents(): void {
    this.subjects = <ISubject[]>this.localStorageService.getData('subjects');
  }

  protected setSubjectName(): void {
    this.subjectsName = this.subjects.map(subject => subject.subjectName);
  }

  protected initializeSubject(): void {
    if (this.localStorageService.isElementOfLocal('subjects')) {
      this.setFromLocalStudents();
    } else { this.setSubjects(); }
    this.setSubjectName();
  }

  public ngOnInit(): void {
    this.initializeSubject();
  }
}
