import {Router} from "express";
import {uuid} from "uuidv4";

const appointmentRouter = Router();

export default appointmentRouter;

const appointments = [];
appointmentRouter.post('/', (request, response) => {
    const {provider, date} = request.body;
    const appointment = {
        id: uuid(),
        provider,
        date
    };
    appointments.push(appointment);
    response.json(appointment);
})
