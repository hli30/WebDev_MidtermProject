
exports.up = function(knex, Promise) {
  return Promise.resolve(knex.schema.createTable("user", (table) => {
    table.increments();
    table.string("role").notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("phone_number").notNullable();
    table.string("street_address").notNullable();
    table.string("geographical_region").notNullable();
    table.string("country").notNullable();
    table.string("postal_code").notNullable();
    table.string("email").notNullable();
  }))
  .then(() => {
    return knex.schema.createTable("restaurant", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.text("description").notNullable();
      table.string("type").notNullable();
      table.string("phone_number").notNullable();
      table.string("address").notNullable();
      table.string("email").notNullable();

      table.integer("user_id").unsigned();      
      table.foreign("user_id").references("id").inTable("user");
    })
  })
  .then(() => {
    return knex.schema.createTable("food", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("type").notNullable();
      table.decimal("price").notNullable();
      table.integer("cook_time_in_minutes").notNullable();

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
