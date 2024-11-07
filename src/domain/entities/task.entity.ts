export class TaskEntity {
    constructor(
        public id: string,
        public title: string,
        public dateCreated: Date,
        public completed: boolean
    ){}

    public static fromObject(object: {[key: string]: any}) {
        const {id, title, dateCreated, completed, userId} = object;
        if (!id) throw 'Id is required';
        if (!title) throw 'Title is required';

        let newDateCreated;
        if(dateCreated) {
            newDateCreated = new Date(dateCreated);
            if (isNaN(newDateCreated.getTime())) {
                throw 'Date Created is not a valid date'
            }
        }

        return new TaskEntity(id, title, dateCreated, completed);
    }
}