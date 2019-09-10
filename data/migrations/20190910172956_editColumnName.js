exports.up = function(knex) {
  return knex.schema.table("cars", table => {
    table.renameColumn("transmisson", "transmission");
  });
};

exports.down = function(knex) {
  return knex.schema.table("cars", table => {
    table.renameColumn("transmission", "transmisson");
  });
};
