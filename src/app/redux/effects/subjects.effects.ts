import { Subject } from 'src/app/common/entities';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, mergeMap } from 'rxjs/operators';
import { DataService } from 'src/app/common/services/data.service';
import { SUBJECTS_ACTION, AddSubject } from '../actions/subjects.actions';

@Injectable()

export class SubjectsEffects {

    @Effect() public loadStudents: Actions = this.actions$.pipe(
        ofType(SUBJECTS_ACTION.ADD_SUBJECT),
        switchMap((action: AddSubject) => {
            return this.dataService.getSubjectsFromHttp();
        }),
        mergeMap((subjects: Subject[]) => {
            return [
                {
                    type: SUBJECTS_ACTION.LOAD_SUBJECTS,
                    payload: subjects
                }
            ];
        })
    );

    constructor(
        private actions$: Actions,
        private dataService: DataService
        ) {}
}
