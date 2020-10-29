import Knex from 'knex';

exports.up = (knex: Knex) => {
    return knex.schema.createTable('web_user_has_web_rule', table => {
        table.integer('web_user_id').unsigned()
        table.integer('web_rule_id').unsigned()
        table.boolean('edit')
        table.boolean('remove')
        table.foreign('web_user_id').references('web_user.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.foreign('web_rule_id').references('web_rule.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.primary(['web_user_id', 'web_rule_id'])
    }).then(function () {
        return knex('web_user_has_web_rule').insert([
            { web_user_id: 1, web_rule_id: 1, edit: 1, remove: 1 },
        ])
    })
};

exports.down = (knex: Knex) => {
    return knex.schema.dropTable('web_user_has_web_rule')
};