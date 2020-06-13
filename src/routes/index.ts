import {Router} from 'express';
import appointmentsRouter from "./appointment.route";
import usesRouter from "./user.route";
import sessionsRouter from "./session.route";

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usesRouter);
routes.use('/sessions', sessionsRouter);


export default routes;
