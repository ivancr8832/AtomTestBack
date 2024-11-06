import { FirebaseDb } from "../../data/firebase";
import { CreateTaskDto, TaskDatasource, TaskEntity, UpdateTaskDto, Pagination } from "../../domain";

export class TaskDatasourceImpl implements TaskDatasource {

    public async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        try {
            const { id } = await FirebaseDb.insert("tasks", { ...createTaskDto });
            return TaskEntity.fromObject({ id, ...createTaskDto })
        } catch(error) {
            throw error
        }
    }

    public async getAll(page: number, limit: number, userId: string): Promise<Pagination<TaskEntity[]>> {
        try {
            const { currentPage, documents, totalPages, totalRecords } = await FirebaseDb.getAll("tasks", page, limit,userId);
            const tasks: TaskEntity[] = documents.map(doc => TaskEntity.fromObject(doc));
            return { currentPage, items: tasks, totalPages, totalRecords };
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<TaskEntity | null> {
        try {
            const task = await FirebaseDb.findById("tasks", id);
            if (!task.exists()) return null;
            return TaskEntity.fromObject({ id, ...task.data() });
        } catch (error) {
            throw error;
        }
    }

    public async update(updateTaskDto: UpdateTaskDto, id: string): Promise<TaskEntity | null> {
        try {
            const task = await this.findById(id);
            if (!task) return null;
            await FirebaseDb.update("tasks", id, { ...updateTaskDto });
            return TaskEntity.fromObject({ id, ...updateTaskDto });
        } catch (error) {
            throw error
        }
    }

    public async delete(id: string): Promise<TaskEntity | null> {
        try {
            const task = await this.findById(id);
            if (!task) return null;
            await FirebaseDb.delete("tasks", id);
            return task;
        } catch (error) {
            throw error;
        }
    }

}