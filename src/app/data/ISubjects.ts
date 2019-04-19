export default interface ISubjects {
    id: string;
    subjectName: string;
    subjectDetails: {
        room: number,
        teacher: string,
        description: string,
    };
}
