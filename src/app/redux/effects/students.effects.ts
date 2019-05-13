import { Student } from './../../common/entities/Student.model';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { STUDENTS_ACTION, AddStudent } from '../actions/students.action';
import { switchMap, mergeMap } from 'rxjs/operators';
import { DataService } from 'src/app/common/services/data.service';

@Injectable()

export class StudentsEffects {

    @Effect() public loadStudents: Actions = this.actions$.pipe(
        ofType(STUDENTS_ACTION.ADD_STUDENT),
        switchMap((action: AddStudent) => {
            return this.dataService.getStudentsFromHttp();
        }),
        mergeMap((students: Student[]) => {
            return [
                {
                    type: STUDENTS_ACTION.LOAD_STUDENTS,
                    payload: students
                }
            ];
        })
    );

    constructor(
        private actions$: Actions,
        private dataService: DataService
        ) {}
}
