import Knex from 'knex';

exports.up = async (knex: Knex) => {
    await knex.schema.createTable('web_rule', table => {
        table.increments('id').primary()
        table.string('name', 45).notNullable()
        table.string('label', 45).notNullable()
        table.boolean('active')
            .notNullable().defaultTo(true)
        table.timestamp('add_at')
            .defaultTo(knex.fn.now())
        table.dateTime('remove_at')
            .defaultTo(null)
        table.integer('web_module_id').unsigned()
        table.foreign('web_module_id').references('web_module.id').onUpdate('CASCADE').onDelete('CASCADE')
    }).then(() => {
        return knex('web_rule').insert([
            {
                id: 1,
                name: 'RULE_WEBUSER_',
                label: 'Usuários do sistema',
                web_module_id: 1,
                active: 1,
            },
        ])
    })
};

exports.down = async (knex: Knex) => {
    await knex.schema.dropTable('web_rule')
};