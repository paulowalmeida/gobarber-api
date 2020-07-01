import {getCustomRepository} from "typeorm";
import {RequestUserDTO} from "../models/dtos/RequestUserDTO";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";
import AppError from "../errors/AppError";

class CreateUserService {

    public async execute({name, email, password}: RequestUserDTO): Promise<User | null> {
        const repository = getCustomRepository(UsersRepository);
        const checkUseExists = await repository.findOne({where: {email}});

        if (checkUseExists){
            throw new AppError('Email address already used.');
        }

        const user = repository.create({name, email, password});
        await repository.save(user);
        return user;
    }
}

export default CreateUserService;
