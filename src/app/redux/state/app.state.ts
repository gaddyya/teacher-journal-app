import { Student } from 'src/app/common/entities';

export interface AppState {
    studentsPage: {
      students: []
    };
    subjectsPage: {
      subjects: []
    };
}
