import { CreateTaskDto, UpdateTaskDto } from "../DTOs";
import { TaskEntity } from "../entities/task.entity";
import { Pagination } from "../interfaces";

export abstract class TaskDatasource {
    abstract create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
    abstract getAll(page: number, limit: number, userId: string): Promise<Pagination<TaskEntity[]>>;
    abstract findById(id: string): Promise<TaskEntity | null>;
    abstract update(updateTaskDto: UpdateTaskDto, id: string): Promise<TaskEntity | null>;
    abstract delete(id: string): Promise<TaskEntity | null>;
}