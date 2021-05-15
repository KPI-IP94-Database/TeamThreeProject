exports.up = (knex) =>
  knex.schema.createTable('speciality', (table) => {
    table.increments('id')
      .unsigned()
      .primary();

    table.string('name')
      .notNullable();

    table.integer('faculty_id')
      .references('faculty.id')
      .notNullable();

    table.integer('budget_places')
      .notNullable();

    table.integer('commerce_places')
      .notNullable();
  });


exports.down = (knex) =>
  knex.schema.dropTable('speciality');
