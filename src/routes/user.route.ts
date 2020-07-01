import {Router} from "express";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import {hash} from 'bcryptjs';
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "../config/upload";
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usesRouter = Router();
const upload = multer(uploadConfig);

usesRouter.get('/', async (request, response) => {
    const repository = getCustomRepository(UsersRepository);
    const users = await repository.find();
    return response.json(users);
});

usesRouter.post('/', async (request, response) => {
    const {name, email, password} = request.body;
    const service = new CreateUserService();
    const hashedPassword = await hash(password, 8);
    const user = await service.execute({name, email, password: hashedPassword});
    delete user?.password;
    return response.json(user);
});

usesRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
    async (request, response) => {

        const service = new UpdateUserAvatarService();
        const {user: {id}, file: {filename}} = request;

        const user = await service.execute({id, filename});
        delete user.password;
        return response.json(user);

    });

export default usesRouter;
