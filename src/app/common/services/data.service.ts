import { STUDENTS, SUBJECTS } from './../constants/URL';
import { Student, Subject } from '../entities';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public httpHeader: any = { headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })};

  constructor(
    private http: HttpClient,
    ) {}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public getStudentsFromHttp(): Observable<Student[]> {
    return this.http.get(STUDENTS).pipe(
      map((data) => <Student[]>data),
      catchError(this.handleError<Student[]>('getStudentsFromHttp', []))
    );
  }

  public getSubjectsFromHttp(): Observable<Subject[]> {
    return this.http.get(SUBJECTS).pipe(
      map((data) => <Subject[]>data),
      catchError(this.handleError<Subject[]>('getSubjectsThroughHttp', []))
    );
  }

  public addStudentThroughHttp(student: Student): Observable<Student> {
    return this.http.post(STUDENTS, JSON.stringify(student), this.httpHeader).pipe(
      map((data) => <Student><unknown>data),
      catchError(this.handleError<Student>('addStudentThroughHttp'))
    );
  }

  public addSubjectThroughHttp(subject: Subject): Observable<Subject> {
    return this.http.post(SUBJECTS, JSON.stringify(subject), this.httpHeader).pipe(
      map((data) => <Subject><unknown>data),
      catchError(this.handleError<Subject>('addSubjectThroughHttp'))
    );
  }

  public updateSubjectThroughHttp(id: number, subject: Subject): Observable<Subject> {
    return this.http.put(SUBJECTS + '/' + id, subject, this.httpHeader).pipe(
      map( (data) => <Subject><unknown>data),
      catchError(this.handleError<Subject>('updateSubjectThroughHttp'))
    );
  }
}
