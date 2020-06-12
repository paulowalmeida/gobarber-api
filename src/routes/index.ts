import {Router} from 'express';
import appointmentsRouter from "./appointment.route";

const routes = Router();

routes.use('/appointments', appointmentsRouter);


export default routes;
