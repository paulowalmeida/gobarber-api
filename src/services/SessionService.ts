import {getCustomRepository} from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import {compare} from 'bcryptjs';
import SessionResponseDTO from "../models/dtos/SessionResponseDTO";
import { sign, verify } from 'jsonwebtoken';

class SessionService {
    public async execute({email, password}: SessionDTO): Promise<SessionResponseDTO> {
        const repository = getCustomRepository(UsersRepository);
        const user = await repository.findOne({where: {email}});

        if (!user){
            throw new Error('Incorrect email/password combination');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched){
            throw new Error('Incorrect email/password combination');
        }

        const token = sign({}, 'b0f82de7c91b8881f0d7e8e6c41c4107', {
            subject: user.id,
            expiresIn: '1d'
        });

        return {user, token};
    }
}

export default SessionService;
