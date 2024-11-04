export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string
    ){}

    public static fromObject(object: {[key: string]: any}) {
        const {id, name, email} = object;
        if (!id) throw 'Id is required';
        if (!name) throw 'Name is required';
        if (!email) throw 'Email is required';

        return new UserEntity(id, name, email);
    }
}