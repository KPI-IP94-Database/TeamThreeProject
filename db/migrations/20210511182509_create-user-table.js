exports.up = (knex) =>
  knex.schema.createTable('user', (table) => {
    table.increments('id').unsigned().primary();

    table.string('email').notNullable();

    table.string('password_hash').notNullable();

    table.string('salt').notNullable();

    table.string('fullname').notNullable();

    table.float('grade_first').notNullable();

    table.float('grade_second').notNullable();

    table.float('grade_third').notNullable();

    table.float('grade_fourth');
    table.float('grade_certificate');
    table.float('additional_score');
  });

exports.down = (knex) => knex.schema.dropTable('user');
