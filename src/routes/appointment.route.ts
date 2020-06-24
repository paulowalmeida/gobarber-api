import {Router} from "express";
import {parseISO} from 'date-fns';
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import {getCustomRepository} from "typeorm";
import  ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
    console.log(req.user);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const {providerId, date} = req.body;
        const parsedDate = parseISO(date);
        const createService = new CreateAppointmentService();
        const appointment = await createService.execute({providerId, date: parsedDate})
        res.json(appointment);
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
});

export default appointmentsRouter;
