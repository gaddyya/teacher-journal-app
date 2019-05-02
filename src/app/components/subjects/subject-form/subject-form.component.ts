import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/common/services/local-storage.service';
import { ISubjects } from '../../../data/ISubjects';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.sass']
})
export class SubjectFormComponent {

  public currentSubject: ISubjects = {
    id: `${Math.floor(Math.random() * 100)}`,
    subjectName: '',
    subjectDetails: {
      room: undefined,
      teacher: '',
      description: '',
    },
  };

  constructor(private localStorageService: LocalStorageService) {}

  public saveData(): void {
    let globalSubject: ISubjects[] = <ISubjects[]>this.localStorageService.getData('subjects');
    globalSubject.push(this.currentSubject);
    this.localStorageService.addData(globalSubject, 'subjects');
  }
}
