exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table){
        table.increments();
        table.timestamps();
        table.integer('status').notNullable();
        table.integer('client_id').unsigned().notNullable();
        table.foreign('client_id').references('id').inTable('clients');
    })
  };
  
  exports.down = function(knex) {
    return knex.shema.dropTable('orders');
  };