import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Student from '../../data/students.json';
import IStudents from '../../data/IStudents';
import Subject from '../../data/subjects.json';
import ISubjects from '../../data/ISubjects';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public getStudents(): Observable<IStudents[]> {
    return of(Student);
  }

  public getSubject(): Observable<ISubjects[]> {
    return of(Subject);
  }
}
