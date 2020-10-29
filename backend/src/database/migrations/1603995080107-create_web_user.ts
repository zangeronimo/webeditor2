import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createWebUser1603995080107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "web_user",
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
                    name: 'email',
                    type: 'varchar',
                    length: "45",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: "60",
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
                },
                {
                    name: 'web_company_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'WebCompany',
                    columnNames: ['web_company_id'],
                    referencedTableName: 'web_company',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('web_user');
    }

}
