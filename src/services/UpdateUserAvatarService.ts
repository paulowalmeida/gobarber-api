import {getRepository} from "typeorm";
import User from "../models/User";
import upload from "../config/upload";
import path from 'path';
import fs from 'fs';

interface Request {
    id: string;
    filename: string;
}

class UpdateUserAvatarService {
    public async execute({id, filename}: Request ): Promise<User>{
        const repository = getRepository(User);
        const user = await repository.findOne(id);

        if (!user){
            throw new Error('Only authenticated users can change avatar')
        }

        if (user.avatar){

            const userAvatarFilePath = path.join(upload.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFilePath){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = filename;
        repository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
