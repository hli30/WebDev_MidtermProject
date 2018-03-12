
exports.up = function(knex, Promise) {
  return Promise.resolve(knex.schema.createTable("user", (table) => {
    table.increments();
    table.string("role")
    table.string("username")
    table.string("password")
    table.string("first_name")
    table.string("last_name")
    table.string("phone_number")
    table.string("street_address")
    table.string("geographical_region")
    table.string("country")
    table.string("postal_code")
    table.string("email")
  }))
  .then(() => {
    return knex.schema.createTable("restaurant", (table) => {
      table.increments();
      table.string("name")
      // table.text("description")
      // table.string("type")
      table.string("phone_number")
      table.string("address")
      // table.string("email")

      table.integer("user_id").unsigned();      
      table.foreign("user_id").references("id").inTable("user");
    })
  })
  .then(() => {
    return knex.schema.createTable("food", (table) => {
      table.increments();
      table.string("name")
      table.string("type")
      table.decimal("price")
      table.integer("cook_time_in_minutes")

      table.integer("restaurant_id").unsigned();
      table.foreign("restaurant_id").references("id").inTable("restaurant");
    })
  })
  .then(() => {
    return knex.schema.createTable("order", (table) => {
      table.increments();

      table.integer("restaurant_id").unsigned();      
      table.integer("user_id").unsigned();      
      table.foreign("restaurant_id").references("id").inTable("restaurant");
      table.foreign("user_id").references("id").inTable("user");
    })
  })
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable("order"))
    .then(() => knex.schema.dropTable("food"))
    .then(() => knex.schema.dropTable("restaurant"))
    .then(() => knex.schema.dropTable("user"))
};
