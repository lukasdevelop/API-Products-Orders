
exports.up = function(knex) {
  return knex('clients').insert({name: 'Administrador'});
};

exports.down = function(knex) {
  
};
