export class Subject {
    public averageMarks: Object = {};
    public journal: Array<{
        date: string,
        marks: {}
      }> = [];
    constructor (
        public subjectName: string,
        public teacher: string,
        public room?: string,
        public description?: string,
        public id?: number
    ) {}
}

export interface ISubjects {
    subjects: Subject[];
}
