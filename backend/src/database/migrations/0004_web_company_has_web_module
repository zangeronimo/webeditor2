import Knex from 'knex';

exports.up = (knex: Knex) => {
    return knex.schema.createTable('web_company_has_web_module', table => {
        table.integer('web_company_id').unsigned()
        table.integer('web_module_id').unsigned()
        table.foreign('web_company_id').references('web_company.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.foreign('web_module_id').references('web_module.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.primary(['web_company_id', 'web_module_id'])
    }).then(function () {
        return knex('web_company_has_web_module').insert([
            { web_company_id: 1, web_module_id: 1 },
        ])
    })
};

exports.down = (knex: Knex) => {
    return knex.schema.dropTable('web_company_has_web_module')
};