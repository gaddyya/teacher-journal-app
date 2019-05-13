import { Action } from '@ngrx/store';
import { Subject } from 'src/app/common/entities';

export enum SUBJECTS_ACTION {
  ADD_SUBJECT = '[SUBJECTS] ADD_SUBJECT',
  DELETE_SUBJECT = '[SUBJECTS] DELETE_SUBJECT',
  LOAD_SUBJECTS = '[SUBJECTS] LOAD_SUBJECTS',
  UPDATE_SUBJECT = '[SUBJECTS] UPDATE SUBJECT'
}

export class AddSubject implements Action {
  public readonly type: SUBJECTS_ACTION.ADD_SUBJECT = SUBJECTS_ACTION.ADD_SUBJECT;
  constructor(public payload: Subject) {}
}

export class DeleteSubject implements Action {
  public readonly type: SUBJECTS_ACTION.DELETE_SUBJECT = SUBJECTS_ACTION.DELETE_SUBJECT;
  constructor(public payload: Subject) {}
}

export class LoadSubjects implements Action {
  public readonly type: SUBJECTS_ACTION.LOAD_SUBJECTS = SUBJECTS_ACTION.LOAD_SUBJECTS;
  constructor(public payload: Subject[]) {}
}

export class UpdateSubject implements Action {
  public readonly type: SUBJECTS_ACTION.UPDATE_SUBJECT = SUBJECTS_ACTION.UPDATE_SUBJECT;
  constructor(public payload: Subject) {}
}

export type SubjectsAction = AddSubject | DeleteSubject | LoadSubjects | UpdateSubject;
