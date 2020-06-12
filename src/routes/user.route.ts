import {Router} from "express";
import {getCustomRepository} from "typeorm";
import UsesRepository from "../repositories/UsersRepository";
import {hash} from 'bcryptjs';
import CreateUserService from "../services/CreateUserService";


const usesRouter = Router();

usesRouter.get('/', async (req, res) => {
    const repository = getCustomRepository(UsesRepository);
    const users = await repository.find();
    return res.json(users);
});

usesRouter.post('/', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const service = new CreateUserService();
        const hashedPassword = await hash(password, 8);
        const user = await service.execute({name, email, password: hashedPassword});
        delete user?.password;
        return res.json(user);
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
});

export default usesRouter;
