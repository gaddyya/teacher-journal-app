import { Student } from './../../common/entities/Student.model';
import { Action } from '@ngrx/store';

export enum STUDENTS_ACTION {
    ADD_STUDENT = '[STUDENTS] ADD_STUDENT',
    DELETE_STUDENT = '[STUDENTS] DELETE_STUDENT',
    LOAD_STUDENTS = '[STUDENTS] LOAD_STUDENTS',
}

export class AddStudent implements Action {
    public readonly type: STUDENTS_ACTION.ADD_STUDENT = STUDENTS_ACTION.ADD_STUDENT;
    constructor(public payload: Student) {}
}

export class DeleteStudent implements Action {
    public readonly type: STUDENTS_ACTION.DELETE_STUDENT = STUDENTS_ACTION.DELETE_STUDENT;
    constructor(public payload: Student) {}
}

export class LoadStudents implements Action {
    public readonly type: STUDENTS_ACTION.LOAD_STUDENTS = STUDENTS_ACTION.LOAD_STUDENTS;
    constructor(public payload: Student[]) {}
}

export type StudentsActions = AddStudent | DeleteStudent | LoadStudents;
