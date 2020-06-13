import {Router} from "express";
import SessionService from "../services/SessionService";

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    try {
        const {email , password} = req.body;
        const service = new SessionService();
        const {user} = await service.execute({email, password});
        delete user.password;
        return res.json({user});
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
});

export default sessionsRouter;
