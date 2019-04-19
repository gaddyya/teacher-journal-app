import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Student from '../../data/students.json';
import IStudents from '../../data/IStudents';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public getStudents(): Observable<IStudents[]> {
    return of(Student);
  }
}
