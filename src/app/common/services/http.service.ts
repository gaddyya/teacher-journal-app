import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IStudents from 'src/app/data/IStudents';
import Students from 'src/app/data/students.json';

interface IStudent {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  /*protected getStudents(): Observable<IStudent> {
    return this.http.get('students.json').pipe(map(data => {
      let studentList = data;
      return studentList.map(function(student: any) {
        return {firstName: <string>student.firstName, lastName: <string>student.lastName};
      });
    }));
  }
  */
}
