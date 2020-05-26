exports.up = function(knex) {
    return knex.schema.createTable('itens_order', function(table) {
        table.increments();
        table.integer('amount').notNullable();
        table.integer('products_id').unsigned().notNullable();
        table.integer('orders_id').unsigned().notNullable();
        table.foreign('products_id').references('id').inTable('products');
        table.foreign('orders_id').references('id').inTable('orders').onDelete('CASCADE');
    }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('itens_order');
};