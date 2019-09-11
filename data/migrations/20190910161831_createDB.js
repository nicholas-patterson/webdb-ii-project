exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
    // increments id for the cars table
    table.increments();
    // create vin column for table
    table
      .string("vin", 17)
      .unique()
      .notNullable();
    // create make column for table
    table.string("make", 128).notNullable();
    // create model column for table
    table.string("model", 128).notNullable();
    // create mileage column for table
    table.integer("mileage").notNullable();
    // create transmission column for table
    table.string("transmisson");
    // create title status column for table
    table.string("statusOfTitle");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist("cars");
};
