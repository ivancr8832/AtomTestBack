import { CreateUserDto } from "../DTOs/user/create-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
    abstract login(email: string): Promise<UserEntity | null>;
    abstract create(userCreateDto: CreateUserDto): Promise<UserEntity>;
}