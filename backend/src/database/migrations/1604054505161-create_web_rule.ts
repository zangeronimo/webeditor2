import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createWebRule1604054505161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "web_rule",
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
                    name: 'rule',
                    type: 'varchar',
                    length: "45",
                    isNullable: false,
                },
                {
                    name: 'label',
                    type: 'varchar',
                    length: "45",
                    isUnique: true,
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
                    name: 'web_module_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
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
        await queryRunner.dropTable('web_rule');
    }

}
