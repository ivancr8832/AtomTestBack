import { NextFunction, Request, Response } from "express";
import { JwtGenerator } from "../../config";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if (!authorization) {
            res.status(401).json({ ok: false, message: "No token provider", data: null });
            return;
        }

        if (!authorization.startsWith('Bearer ')) {
            res.status(401).json({ ok: false, message: "Invalid Bearer token", data: null });
            return;
        }

        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await JwtGenerator.validateToken<UserEntity>(token);

            if (!payload) {
                res.status(401).json({ ok: false, message: "Invalid token", data: null });
                return;
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, message: "Talk to administrator", data: null });
        }
    }
}