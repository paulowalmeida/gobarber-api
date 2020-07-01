import {getCustomRepository} from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import {compare} from 'bcryptjs';
import SessionResponseDTO from "../models/dtos/SessionResponseDTO";
import {sign} from 'jsonwebtoken';
import auth from "../config/auth";
import AppError from "../errors/AppError";

class SessionService {
    public async execute({email, password}: SessionDTO): Promise<SessionResponseDTO> {
        const repository = getCustomRepository(UsersRepository);
        const user = await repository.findOne({where: {email}});

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const {secret, expiresIn} = auth.jtw;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return {user, token};
    }
}

export default SessionService;
