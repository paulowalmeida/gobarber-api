import { Router, Request } from 'express';
import appointmentRouter from "./appointment.route";

const routes = Router();

routes.use('/appointments', appointmentRouter);


export default routes;
