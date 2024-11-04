import { Request, Response } from "express";
import { UserRepository } from "../../domain";
import { CreateUserDto } from '../../domain/DTOs/user/create-user.dto';
import { JwtGenerator } from "../../config";

export class UserController {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    public login = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            if (!email || email.length == 0) {
                res.status(400).json({ ok: false, message: "Email property is required", data: null });
                return;
            }

            const userEntity = await this.userRepository.login(email);

            if (!userEntity) {
                res.status(401).json({ ok: false, message: "Email incorrect", data: null });
                return;
            }

            const token = await JwtGenerator.generateToken({ ...userEntity });

            if (!token) {
                res.status(400).json({ ok: false, message: "Token no created", data: null })
                return;
            }

            res.json({ ok: true, message: null, data: { token, user: userEntity } });
            return

        } catch (error) {
            res.status(500).json({ ok: false, message: "Talk to administrator", data: null })
            return;
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const [error, createUserDto] = CreateUserDto.create(req.body);
            if (error) {
                res.status(400).json({ ok: false, message: error, data: null });
                return;
            }
            const newUser = await this.userRepository.create(createUserDto!);

            const token = await JwtGenerator.generateToken({ ...newUser });

            if (!token) {
                res.status(400).json({ ok: false, message: "Token no created", data: null })
                return;
            }

            res.json({ ok: true, message: null, data: { token, user: newUser } });
        } catch (error) {
            res.status(500).json({ ok: false, message: "Talk to administrator", data: null })
            return;
        }
    }
}