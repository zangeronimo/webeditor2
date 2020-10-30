import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createWebCompanyHasWebModule1604055500137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "web_company_has_web_module",
            columns: [
                {
                    name: 'web_company_id',
                    type: 'integer',
                },
                {
                    name: 'web_module_id',
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
                },
                {
                    name: 'WebModule',
                    columnNames: ['web_module_id'],
                    referencedTableName: 'web_module',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('web_company_has_web_module');
    }

}
