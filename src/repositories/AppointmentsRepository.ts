import Appointment from "../models/Appointment";
import {isEqual} from "date-fns";
import {CreateAppointmentDTO} from "../models/dtos/CreateAppointmentDTO";

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public create({provider, date}: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({provider, date});
        this.appointments.push(appointment);
        return appointment;
    }

    public findByDate(date: Date): Appointment | null {
        const result = this.appointments.find(appointment => isEqual(date, appointment.date));
        return result || null;
    }

    public findAll(): Appointment[] {
        return this.appointments;
    }
}

export default AppointmentsRepository;
