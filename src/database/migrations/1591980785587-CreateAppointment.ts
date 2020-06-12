import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class CreateAppointment1591980785587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointment',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'providerId',
                        type: 'uuid'
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true
                    }
                ]
            })
        );

        await queryRunner.createIndex('appointment', new TableIndex({
            name: "IDX_ID_PROVIDER",
            columnNames: ["id", "providerId"]
        }));

        await queryRunner.createForeignKey('appointment', new TableForeignKey({
            columnNames: ['providerId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointment');
    }
}
