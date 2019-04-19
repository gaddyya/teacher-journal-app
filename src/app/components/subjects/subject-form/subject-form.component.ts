import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/common/services/local-storage.service';
import ISubject from '../../../data/ISubjects';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.sass']
})
export class SubjectFormComponent {

  public currentSubject: ISubject = {
    id: `${Math.floor(Math.random() * 100)}`,
    subjectName: '',
    subjectDetails: {
      room: 0,
      teacher: '',
      description: '',
    },
  };

  constructor(private localStorageService: LocalStorageService) {}

  public saveData(): void {
    let globalSubject: ISubject[] = <ISubject[]>this.localStorageService.getData('subjects');
    globalSubject.push(this.currentSubject);
    this.localStorageService.addData(globalSubject, 'subjects');
    console.log(this.localStorageService.getData('subjects'));
  }
}
