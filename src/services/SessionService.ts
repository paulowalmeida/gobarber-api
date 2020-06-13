import {getCustomRepository} from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import {compare} from "bcryptjs";
import SessionResponseDTO from "../models/dtos/SessionResponseDTO";



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

        return {user};
    }
}

export default SessionService;
