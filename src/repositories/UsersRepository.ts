import {EntityRepository, Repository} from "typeorm";
import User from "../models/User";

@EntityRepository(User)
class UsesRepository extends Repository<User> {
}

export default UsesRepository;
