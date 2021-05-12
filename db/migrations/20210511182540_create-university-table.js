exports.up = (knex) =>
  knex.schema.createTable('university', (table) => {
    table.increments('id')
      .unsigned()
      .primary();

    table.string('name')
      .notNullable();
  });


exports.down = (knex) =>
  knex.schema.dropTable('university');
