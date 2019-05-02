import Students from '../../data/students.json';
import Subjects from '../../data/subjects.json';
import { Injectable } from '@angular/core';
import { IStudents } from '../../data/IStudents';
import { ISubjects } from '../../data/ISubjects';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  public createDb(): any {
    const STUDENTS: IStudents[] = Students;
    const SUBJECTS: ISubjects[] = Subjects;
    return {STUDENTS, SUBJECTS};
  }
}
