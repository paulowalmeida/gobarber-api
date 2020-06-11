import {uuid} from "uuidv4";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('appointment')
class Appointment {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    provider: string;

    @Column("datetime")
    date: Date;

    /*
    * Será gerado automaticamente por causa do mapeamento do TypeORM
    *
    constructor({provider, date}: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
     */
}

export default Appointment;
