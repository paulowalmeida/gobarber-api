import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('appointment')
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    provider: string;

    @Column('timestamp')
    date: Date;
}

export default Appointment;
