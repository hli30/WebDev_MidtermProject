
exports.up = function(knex, Promise) {
  return knex.schema.table("order", (table) => {
    table.string("status").notNullable();
  })
  .then(() => {
    return knex.schema.createTable("checkout", (table) => {
      table.increments();
      table.integer("quantity");
      table.integer("order_id").unsigned();
      table.integer("food_id").unsigned();
      
      table.foreign("order_id").references("id").inTable("order");
      table.foreign("food_id").references("id").inTable("food");
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("order", (table) => {
    table.dropColumn("status");
  })
  .then(() => knex.schema.dropTable("checkout"))
};
