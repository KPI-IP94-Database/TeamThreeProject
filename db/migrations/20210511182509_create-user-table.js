exports.up = (knex) =>
  knex.schema.createTable('user', (table) => {
    table.increments('id')
      .unsigned()
      .primary();

    table.string('email')
      .notNullable();

    table.string('password_hash')
      .notNullable();

    table.string('salt')
      .notNullable();

    table.float('grade_first');
    table.float('grade_second');
    table.float('grade_third');
    table.float('grade_certificate');
  });


exports.down = (knex) =>
  knex.schema.dropTable('user');
