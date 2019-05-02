import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/common/services/local-storage.service.js';
import { DataService } from '../../../common/services/data.service';
import { ISubjects } from '../../../data/ISubjects';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.sass']
})
export class SubjectPageComponent {

  public subjectsName: string[];
  public subjects: ISubjects[];

  constructor(
    private dataSource: DataService,
    private localStorageService: LocalStorageService) {
  }

  private setSubjects(): void {
    this.dataSource.getSubjectFromHttp().subscribe(subjects => {
      this.subjects = subjects;
      this.subjectsName = this.subjects.map(subject => subject.subjectName);
      if (!(this.subjects === undefined)) {
        this.localStorageService.addData(this.subjects, 'subjects');
      }
    });
  }

  private setFromLocalStudents(): void {
    this.subjects = <ISubjects[]>this.localStorageService.getData('subjects');
  }

  private setSubjectName(): void {
    this.subjectsName = this.subjects.map(subject => subject.subjectName);
  }

  private initializeSubject(): void {
    if (this.localStorageService.isElementOfLocal('subjects')) {
      this.setFromLocalStudents();
      this.setSubjectName();
    } else {
      this.setSubjects();
    }
  }

  public ngOnInit(): void {
    this.initializeSubject();
  }
}
