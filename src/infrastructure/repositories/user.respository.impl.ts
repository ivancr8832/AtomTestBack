import { UserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/DTOs/user/create-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {

    constructor(
        private readonly datasource: UserDatasource
    ){}

    login(email: string): Promise<UserEntity | null> {
        return this.datasource.login(email);
    }
    create(userCreateDto: CreateUserDto): Promise<UserEntity> {
        return this.datasource.create(userCreateDto);
    }

}