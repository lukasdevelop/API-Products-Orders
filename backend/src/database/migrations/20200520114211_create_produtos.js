
exports.up = function(knex) {
  return knex.schema.createTable('products', function(table) {
      table.increments();
      table.string('name', 1000).notNullable();
      table.decimal('price').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('products');
};
