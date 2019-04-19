import { Component } from '@angular/core';
import Subject from '../../../data/subjects.json';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.sass']
})
export class SubjectPageComponent {

  public subjects: string[] = Subject.map((subjects) => subjects.subjectName);
}
