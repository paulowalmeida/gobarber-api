import Appointment from "../models/Appointment";
import {startOfHour} from "date-fns";
import {RequestAppointmentDTO} from "../models/dtos/RequestAppointmentDTO";
import {getCustomRepository} from "typeorm";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

class CreateAppointmentService {

    public async execute({providerId, date}: RequestAppointmentDTO): Promise<Appointment | null> {
        const repository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await repository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = repository.create({providerId, date: appointmentDate});
        await repository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
