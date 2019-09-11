exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: "1G37D9FHS63HF72ED",
          make: "Nissan",
          model: "Altima",
          mileage: 60000,
          transmission: "automatic",
          statusOfTitle: "clean"
        },
        {
          vin: "H72NS926DH28SNDDS",
          make: "Jeep",
          model: "Wrangler",
          mileage: 120000,
          transmission: "manual",
          statusOfTitle: "salvage"
        },
        {
          vin: "DHD73NQ0Q2N8DADHH",
          make: "Chevy",
          model: "Tahoe",
          mileage: 30000,
          transmission: "automatic",
          statusOfTitle: "clean"
        }
      ]);
    });
};
