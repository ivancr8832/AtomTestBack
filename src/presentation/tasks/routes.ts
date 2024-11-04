import { Router } from "express";
import { TasksController } from "./controller";
import { TaskDatasourceImpl } from "../../infrastructure/datasource/task.datasource.impl";
import { TaskRespositoryImpl } from "../../infrastructure/repositories/task.repository.impl";

export class TaskRoutes {
    static get routes(): Router {

        const router = Router();

        const datasource = new TaskDatasourceImpl();
        const taskRepository = new TaskRespositoryImpl(datasource);

        const taskController = new TasksController(taskRepository);

        router.get('/', taskController.getTasks);
        router.get('/:id', taskController.getTaskById);

        router.post('/', taskController.createTask);
        router.put('/:id', taskController.updateTask);
        router.delete('/:id', taskController.deleteTask);

        return router;
    }
}