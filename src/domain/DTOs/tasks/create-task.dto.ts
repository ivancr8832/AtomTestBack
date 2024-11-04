export class CreateTaskDto {
    private constructor(
        public readonly title: string,
        public readonly dateCreated: Date,
        public readonly completed: boolean
    ){}

    static create(props: {[key: string]: any}): [string?, CreateTaskDto?] {
        const { title, dateCreated } = props;
        if (!title) return ['Title property is required', undefined];
        if (!dateCreated) return ['Title property is required', undefined];
        return [undefined, new CreateTaskDto(title, dateCreated, false)];
    }
}