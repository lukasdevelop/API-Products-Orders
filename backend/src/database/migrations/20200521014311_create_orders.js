exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table){
        table.increments();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('status').default(0);
        table.integer('client_id').unsigned().notNullable();
        table.foreign('client_id').references('id').inTable('clients').onDelete('CASCADE');
    })
  };
  
  exports.down = function(knex) {
    return knex.shema.dropTable('orders');
  };