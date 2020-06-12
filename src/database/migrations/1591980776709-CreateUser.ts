import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUser1591980776709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar',
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
                    },
                    {
                        name: 'disabledAt',
                        type: 'timestamp',
                        isNullable: true
                    }
                ]
            }));

        await queryRunner.createIndex('user', new TableIndex({
            name: "IDX_ID_NAME_EMAIL",
            columnNames: ["id", "name", "email"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }
}
