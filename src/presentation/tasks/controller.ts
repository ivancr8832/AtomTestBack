import { Request, Response } from "express";
import { CreateTaskDto, UpdateTaskDto } from "../../domain/DTOs";
import { TaskRepository } from "../../domain";

export class TasksController {
    constructor(
        private readonly taskRepository: TaskRepository
    ){}

    public getTasks = async (req: Request, res: Response) => {
        try {
            let { page, limit, userId } = req.query;

            page = page ? page : "1";
            limit = limit ? limit : "5";

            const paginationTask = await this.taskRepository.getAll(Number(page), Number(limit), userId as string);
            res.status(200).json({ ok: true, message: null, data: paginationTask });

            return;
        } catch (error) {
            res.status(500).json({ ok: false, message: "Talk to administrator", data: null })
            return;
        }
    }

    public getTaskById = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            if (!id) {
                res.status(400).json({ ok: false, message: "Id property is required", data: null });
                return;
            }

            const task = await this.taskRepository.findById(id)
            if (!task) {
                res.status(404).json({ ok: false, message: "Task not found", data: null });
                return;
            }
            res.status(200).json({ ok: true, message: null, data: task });
            return;
        } catch (error: any) {
            res.status(500).json({ ok: false, message: "Talk to administrator", data: null });
            return;
        }
    }

    public createTask = async (req: Request, res: Response) => {
        try {
            const [error, createTaskDto] = CreateTaskDto.create(req.body);
            if (error) {
                res.status(400).json({ ok: false, message: error, data: null });
                return;
            }
            const newTask = await this.taskRepository.create(createTaskDto!);
            res.json({ ok: true, message: null, data: newTask });
            return;
        } catch(error: any) {
            res.status(500).json({ ok: false, message: "Talk to administrator", data: null })
            return;
        }
    }

    public updateTask = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            if (!id) {
                res.status(400).json({ ok: false, message: "Id property is required", data: null });
                return;
            }

            const [error, updateTaskDto] = UpdateTaskDto.create(req.body);

            if (error) {
                res.status(400).json({ ok: false, message: error, data: null });
                return;
            }

            const taskUpdate = await this.taskRepository.update(updateTaskDto!, id);

            if (!taskUpdate) {
                res.status(404).json({ ok: false, message: "Task not found", data: null });
                return
            }

            res.json({ ok: true, message: null, data: taskUpdate });
            return;

        } catch (error) {
            console.log(error)
            res.status(500).json({ ok: false, message: "Talk to administrator", data: null });
            return;
        }
    }

    public deleteTask = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            if (!id) {
                res.status(400).json({ ok: false, message: 'Id property is required', data: null });
                return;
            }

            const taskDeleted = await this.taskRepository.delete(id);
            if (!taskDeleted) {
                res.status(404).json({ ok: false, message: "Task not found", data: null });
                return
            }

            res.json({ ok: true, message: null, data: taskDeleted });
            return;

        } catch (error) {
            res.status(500).json({ ok: false, message: "Talk to administrator", data: null });
            return;
        }
    }
}