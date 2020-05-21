
exports.up = function(knex) {
  return knex('products').insert({name: 'Smartphone', price: 1000.00});
};

exports.down = function(knex) {
  
};
