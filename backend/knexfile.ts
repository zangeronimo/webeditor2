require('dotenv').config()
module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './database.sqlite'
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: process.env.DB_CLIENT,
        connection: {
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
}