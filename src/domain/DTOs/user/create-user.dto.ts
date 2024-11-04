export class CreateUserDto {
    private constructor(
        public readonly name: string,
        public readonly email: string
    ){}

    static create(props: {[key: string]: any}): [string?, CreateUserDto?] {
        const { name, email } = props;
        if (!name) return ['Name property is required', undefined];
        if (!email) return ['Email property is required', undefined];
        return [undefined, new CreateUserDto(name, email)];
    }
}