exports.up = (knex) =>
  knex.schema.createTable('application', (table) => {
    table.increments('id')
      .unsigned()
      .primary();

    table.integer('user_id')
      .references('user.id')
      .notNullable();

    table.integer('speciality_id')
      .references('speciality.id')
      .notNullable();

    // The letter 'K' is English
    const priorityValues = ['1', '2', '3', '4', '5', '6', '7', 'K'];
    table.enu('priority', priorityValues)
      .notNullable();

    const statusValues = [
      'RECEIVED',
      'COMMERCE_RECOMMEND',
      'BUDGET_RECOMMEND',
      'IN_THE_ORDER',
    ];
    table.enu('status', statusValues)
      .notNullable();
  });


exports.down = (knex) =>
  knex.schema.dropTable('application');
