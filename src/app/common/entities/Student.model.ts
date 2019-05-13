import * as uuid1 from 'uuid/v1';

export class Student {
  public index: string = uuid1();
    constructor(
        public firstName: string,
        public lastName: string,
        public address?: string,
        public description?: string,
        public id?: number,
    ) {}
}

export interface IStudents {
    students: Student[];
}
