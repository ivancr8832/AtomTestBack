import { Router } from "express";
import { UserController } from "./controller";
import { UserDatasourceImpl } from "../../infrastructure/datasource/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.respository.impl";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UserDatasourceImpl();
        const userRepository = new UserRepositoryImpl(datasource);

        const userController = new UserController(userRepository);

        router.post('/login', userController.login);
        router.post('/', userController.create)

        return router;
    }
}