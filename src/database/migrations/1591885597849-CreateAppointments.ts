import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1591885597849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointment',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'date',
                        type: 'datetime',
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointment');
    }

}
