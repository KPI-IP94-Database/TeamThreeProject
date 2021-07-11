exports.up = (knex) =>
  knex.schema.createTable('faculty', (table) => {
    table.increments('id').unsigned().primary();

    table.string('name').notNullable();

    table.integer('university_id').references('university.id').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('faculty');
