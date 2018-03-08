

exports.seed = function(knex, Promise) {
  return deleteTables(knex)
    .then(() => {
      return Promise.all([
        seedFood(knex),
        seedMenu(knex)
      ]);
    })
};

const deleteTables = (knex) => {
  return Promise.all([
    knex("food").del(),
    knex("menu").del()
  ])
}

const seedContacts = (knex, Promise) => {
  knex("contact").insert({
    first_name: "John", 
    last_name: "Smith", 
    phone_number: "1234567890",
    street_address: "123 Street",
    geographical_region: "BC",
    country: "Canada",
    postal_code: "V3V3V3",
    email: "hi@hi.com"
  })
}

const seedCustomer = (knex, Promise) => {

}

const seedRestaurant = (knex, Promise) => {

}
const seedMenu = (knex, Promise) => {
  knex("menu").insert({

  })
}
function seedFood (knex) {
  return knex("food")
    .returning("id")
    .insert({
      name: "apple",
      type: "app",
      price: 12.5,
      cook_time_in_minutes: 5
    }).then((id) => {
      console.log("id", id);
      return knex("menu").insert({
        food_id: id[0]
      })
    })
}