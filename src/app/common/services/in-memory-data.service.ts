import { Injectable } from '@angular/core';
import Students from '../../data/students.json';
import IStudents from '../../data/IStudents';
import Subjects from '../../data/subjects.json';
import ISubjects from '../../data/ISubjects';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  public createDb() {
    const STUDENTS: IStudents[] = Students;
    const SUBJECTS: ISubjects[] = Subjects;
    return {STUDENTS, SUBJECTS};
  }
}
