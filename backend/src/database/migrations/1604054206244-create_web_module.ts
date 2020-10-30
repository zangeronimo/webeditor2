import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createWebModule1604054206244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "web_module",
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: "45",
                    isNullable: false,
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'add_at',
                    type: "datetime",
                    isNullable: false,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('web_module');
    }

}
