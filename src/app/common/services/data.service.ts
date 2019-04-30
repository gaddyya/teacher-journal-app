import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Student from '../../data/students.json';
import IStudents from '../../data/IStudents';
import Subject from '../../data/subjects.json';
import ISubjects from '../../data/ISubjects';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private studentsUrl = 'api/STUDENTS';
  private subjectsUrl = 'api/SUBJECTS';

  constructor(private http: HttpClient) {}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public getStudents(): Observable<IStudents[]> {
    return of(Student);
  }

  public getSubject(): Observable<ISubjects[]> {
    return of(Subject);
  }

  public getStudentsFromHttp(): Observable<IStudents[]> {
    return this.http.get<IStudents[]>(this.studentsUrl).pipe(
      catchError(this.handleError<IStudents[]>('getStudentsFromHttp', []))
    )
  }

  public getSubjectFromHttp(): Observable<ISubjects[]> {
    return this.http.get<ISubjects[]>(this.subjectsUrl).pipe(
      catchError(this.handleError<ISubjects[]>('getSubjectsFromHttp', []))
    );
  }
}
