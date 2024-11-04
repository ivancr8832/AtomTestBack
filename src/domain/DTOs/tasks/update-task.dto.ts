export class UpdateTaskDto {
    private constructor(
        public readonly title: string,
        public readonly dateCreated: Date,
        public readonly completed: boolean
    ){}

    static create(props: {[key: string]: any}): [string?, UpdateTaskDto?] {
        const { title, dateCreated, completed } = props;
        if (!title) return ['Title property is required', undefined];
        if (!dateCreated) return ['Title property is required', undefined];
        return [undefined, new UpdateTaskDto(title, dateCreated, completed)];
    }
}