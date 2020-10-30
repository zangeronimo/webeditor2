import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createWebUserHasWebRule1604055630683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "web_user_has_web_rule",
            columns: [                
                {
                    name: 'web_user_id',
                    type: 'integer',
                },
                {
                    name: 'web_rule_id',
                    type: 'integer',
                },
                {
                    name: 'create',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'remove',
                    type: 'boolean',
                    default: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'WebUser',
                    columnNames: ['web_user_id'],
                    referencedTableName: 'web_user',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'WebRule',
                    columnNames: ['web_rule_id'],
                    referencedTableName: 'web_rule',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('web_user_has_web_rule');
    }

}
