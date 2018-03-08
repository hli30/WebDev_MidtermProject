
exports.up = function(knex, Promise) {
  return Promise.resolve(knex.schema.createTable("contact", (table) => {
      table.increments();
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
      return knex.schema.createTable("food", (table) => {
        table.increments();

        table.string("name").notNullable();
        table.string("type").notNullable();
        table.decimal("price").notNullable();
        table.integer("cook_time_in_minutes").notNullable();
      })
    })
    .then(() => {
      return knex.schema.createTable("menu", (table) => {
        table.increments();

        table.integer("food_id").unsigned();      
        table.foreign("food_id").references("id").inTable("food");
      })
    })
    .then(() => {
      return knex.schema.createTable("customer", (table) => {
        table.increments();
        table.string("username").notNullable();
        table.string("password").notNullable();

        table.integer("contact_id").unsigned();
        table.foreign("contact_id").references("id").inTable("contact");
      })
    })
    .then(() => {
      return knex.schema.createTable("restaurant", (table) => {
        table.increments();
        table.string("name").notNullable();
        table.text("description");
        table.string("type").notNullable();
        table.string("phone_number").notNullable();
        table.string("address").notNullable();
        table.string("email").notNullable();

        table.integer("menu_id").unsigned();      
        table.foreign("menu_id").references("id").inTable("menu");
      })
    })
    .then(() => {
      return knex.schema.createTable("order", (table) => {
        table.increments();

        table.integer("restaurant_id").unsigned();      
        table.integer("customer_id").unsigned();      
        table.foreign("restaurant_id").references("id").inTable("restaurant");
        table.foreign("customer_id").references("id").inTable("customer");
      })
    })
    .then(() => {
      return knex.schema.createTable("owner", (table) => {
        table.increments();
        table.string("username").notNullable();
        table.string("password").notNullable();
        
        table.integer("restaurant_id").unsigned();      
        table.foreign("restaurant_id").references("id").inTable("restaurant");
        table.integer("contact_id").unsigned();      
        table.foreign("contact_id").references("id").inTable("contact");
      })
    })
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable("order"))
    .then(() => knex.schema.dropTable("owner"))
    .then(() => knex.schema.dropTable("restaurant"))
    .then(() => knex.schema.dropTable("menu"))
    .then(() => knex.schema.dropTable("customer"))
    .then(() => knex.schema.dropTable("contact"))
    .then(() => knex.schema.dropTable("food"))
};
