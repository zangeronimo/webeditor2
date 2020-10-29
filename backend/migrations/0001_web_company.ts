import Knex from 'knex';

exports.up = async (knex: Knex) => {
    await knex.schema.createTable('web_company', table => {
        table.increments('id').primary()
        table.string('name', 45).notNullable()
        table.string('email', 45).notNullable().unique()
        table.string('password', 60)
        table.boolean('active')
            .notNullable().defaultTo(true)
        table.timestamp('add_at')
            .defaultTo(knex.fn.now())
        table.dateTime('remove_at')
            .defaultTo(null)
    }).then(() => {
        return knex('web_company').insert([
            {
                id: 1,
                name: 'Tudo Linux',
                email: 'zangeronimo@gmail.com',
                password: '123mudar',
                active: 1,
            },
        ])
    })
};

exports.down = async (knex: Knex) => {
    await knex.schema.dropTable('web_company')
};