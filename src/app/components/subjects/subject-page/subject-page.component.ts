import { Component, OnInit } from '@angular/core';
import Subject from '../../../data/subjects.json';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.sass']
})
export class SubjectPageComponent implements OnInit {

  public SUBJECTS: any[] = Subject;

  constructor() { }

  public button(): void {
    console.log('div');
  }

  public ngOnInit(): void {
    return;
  }

}
