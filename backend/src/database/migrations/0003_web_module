import Knex from 'knex';

exports.up = async (knex: Knex) => {
    await knex.schema.createTable('web_module', table => {
        table.increments('id').primary()
        table.string('name', 45).notNullable()
        table.boolean('active')
            .notNullable().defaultTo(true)
        table.timestamp('add_at')
            .defaultTo(knex.fn.now())
        table.dateTime('remove_at')
            .defaultTo(null)
    }).then(() => {
        return knex('web_module').insert([
            {
                id: 1,
                name: 'WEBEditor',
                active: 1,
            },
        ])
    })
};

exports.down = async (knex: Knex) => {
    await knex.schema.dropTable('web_module')
};