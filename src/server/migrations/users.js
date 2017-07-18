// eslint-disable-next-line no-unused-vars
exports.up = (knex, Promise) =>
  knex.schema.createTable('clientusers', (table) => {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password_digest').notNullable();
    table.timestamps();
  });

// eslint-disable-next-line no-unused-vars
exports.down = (knex, Promise) => knex.schema.dropTable('clientUsers');
