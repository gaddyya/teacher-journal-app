import { STUDENTS_ACTION, StudentsActions } from '../actions/students.action';
import { IStudents } from 'src/app/common/entities';

const initialState: IStudents = {
    students: []
};

export function studentsReducer (state: IStudents = initialState, action: StudentsActions) {
    switch (action.type) {
        case STUDENTS_ACTION.ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, action.payload]
            };
        case STUDENTS_ACTION.LOAD_STUDENTS:
            return {
                ...state,
                students: [...action.payload]
            };
        default:
         return state;
    }
}
