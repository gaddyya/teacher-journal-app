import { Component, OnInit } from '@angular/core';
import Subject from '../../../data/subjects.json';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.sass']
})
export class SubjectPageComponent implements OnInit {

  public subjects: string[] = Subject.map((subjects) => subjects.subjectName);

  public sayHello(): void {
    console.log('Hello');
  }

  public ngOnInit(): void {
    
  }
}
