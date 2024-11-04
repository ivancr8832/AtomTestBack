import { CreateTaskDto, Pagination, TaskDatasource, TaskEntity, TaskRepository, UpdateTaskDto } from "../../domain";

export class TaskRespositoryImpl implements TaskRepository {

    constructor(
        private readonly datasource: TaskDatasource
    ){}

    create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.datasource.create(createTaskDto);
    }
    getAll(page: number, limit: number): Promise<Pagination<TaskEntity[]>> {
        return this.datasource.getAll(page, limit);
    }
    findById(id: string): Promise<TaskEntity | null> {
        return this.datasource.findById(id);
    }
    update(updateTaskDto: UpdateTaskDto, id: string): Promise<TaskEntity | null> {
        return this.datasource.update(updateTaskDto, id);
    }
    delete(id: string): Promise<TaskEntity | null> {
        return this.datasource.delete(id);
    }

}