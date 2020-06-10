import Appointment from "../models/Appointment";
import {startOfHour} from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import {RequestDTO} from "../models/dtos/RequestDTO";

class CreateAppointmentService {
    private repository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.repository = appointmentsRepository;
    }

    public execute({provider, date}: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = this.repository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        return this.repository.create({provider, date: appointmentDate});
    }
}

export default CreateAppointmentService;
