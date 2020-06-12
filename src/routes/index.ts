import {Router} from 'express';
import appointmentsRouter from "./appointment.route";
import usesRouter from "./user.route";

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usesRouter);


export default routes;
