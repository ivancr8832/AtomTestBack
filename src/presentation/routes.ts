import { Router } from "express";
import { TaskRoutes } from "./tasks/routes";
import { UserRoutes } from "./users/routes";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();

        router.use('/api/task', [ AuthMiddleware.validateJWT ], TaskRoutes.routes);
        router.use('/api/user', UserRoutes.routes);

        return router;
    }
}