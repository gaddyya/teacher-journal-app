import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { IStudents } from '../../data/IStudents';
import { ISubjects } from '../../data/ISubjects';


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
