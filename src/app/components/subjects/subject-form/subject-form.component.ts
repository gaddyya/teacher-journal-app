import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/common/services/local-storage.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.sass']
})
export class SubjectFormComponent {

  protected currentSubject: object = {
    id: Math.floor(Math.random() * 100),
    subject: '',
    teacher: '',
    description: '',
  };

  constructor(private localStorageService: LocalStorageService) {}

  public saveData(): void {
    let globalSubject: object[] = this.localStorageService.getData('subjects');
    globalSubject.push(this.currentSubject);
    this.localStorageService.addData(globalSubject, 'subjects');
  }
}
