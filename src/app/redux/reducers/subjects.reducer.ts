import { ISubjects } from "src/app/common/entities";
import { SubjectsAction, SUBJECTS_ACTION } from '../actions/subjects.actions';

const initialState: ISubjects = {
  subjects: []
};

export function subjectsReducer (state: ISubjects = initialState, action: SubjectsAction) {
  switch (action.type) {
    case SUBJECTS_ACTION.ADD_SUBJECT:
      return {
        ...state,
        subjects: [...state.subjects, action.payload]
      }
    case SUBJECTS_ACTION.LOAD_SUBJECTS:
      return {
        ...state,
        subjects: [...action.payload]
      }
    case SUBJECTS_ACTION.UPDATE_SUBJECT:
      const idx = state.subjects.findIndex( el => el.subjectName === action.payload.subjectName);
      state.subjects[idx] = action.payload;
      return {
        ...state,
        subjects: [...state.subjects]
      }
    default:
      return state;
  }
}
