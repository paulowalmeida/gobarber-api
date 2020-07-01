import {Router} from "express";
import SessionService from "../services/SessionService";

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    const {email, password} = req.body;
    const service = new SessionService();
    const {user, token} = await service.execute({email, password});
    delete user.password;
    return res.json({user, token});
});

export default sessionsRouter;
