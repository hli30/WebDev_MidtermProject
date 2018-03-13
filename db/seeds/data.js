const zomato = require("../../api/zomato")

//Internal data obj for ease of access
const data = {
  restInfo: null
}

exports.seed = function(knex, Promise) {
  return deleteTables(knex)
    .then(() => zomato.getRestaurantSeed())
    .then((restInfo) => {
      data.restInfo = restInfo;
      return seedUser(knex)
    })
    .then((user_ids) => seedRestaurant(knex))
    .then((restaurant_ids) => seedFood(knex, restaurant_ids))
};

const deleteTables = (knex) => {
  return Promise.resolve(knex("order").del())
    .then(() => knex("food").del())
    .then(() => knex("restaurant").del())
    .then(() => knex("user").del())
};

const seedUser = (knex) => {
  return knex("user")
    .returning("id")
    .insert([
      {
        role: "customer",
        username: "testCus",
        password: "hashedpw",
        first_name: "John", 
        last_name: "Smith", 
        phone_number: "1234567890",
        street_address: "123 Street",
        geographical_region: "BC",
        country: "Canada",
        postal_code: "V3V3V3",
        email: "hi@hi.com"
      },
      {
        role: "owner",
        username: "testOwn",
        password: "hashedpw2",
        first_name: "Johnny", 
        last_name: "Smithy", 
        phone_number: "1234567890",
        street_address: "123 Street",
        geographical_region: "BC",
        country: "Canada",
        postal_code: "V3V3V3",
        email: "hi@hi.com"
      },
      {
        role: "owner",
        username: "testOwn1",
        password: "hashedpw3",
        first_name: "Jane", 
        last_name: "Doe", 
        phone_number: "1234567890",
        street_address: "123 Street",
        geographical_region: "BC",
        country: "Canada",
        postal_code: "V3V3V3",
        email: "hi@hi.com"
      }
    ])
}

const seedRestaurant = (knex) => {
  return knex("restaurant")
    .returning("id")
    .insert(data.restInfo)
}

const seedOrder = (knex, user_restaurant_ids) => {
  return knex("order")
    .then(() => {
      return user_restaurant_ids[1];
    })
}

const seedFood = (knex, restaurant_ids) => {
  return knex("food")
    .insert([
      {
        name: "Dish1",
        type: "Appetizer",
        price: 12.5,
        cook_time_in_minutes: 5,
        restaurant_id: restaurant_ids[0]
      },
      {
        name: "Dish2",
        type: "Main",
        price: 1.5,
        cook_time_in_minutes: 3,
        restaurant_id: restaurant_ids[0]
      },
      {
        name: "Dish3",
        type: "Side",
        price: 10,
        cook_time_in_minutes: 10,
        restaurant_id: restaurant_ids[0]
      },
      {
        name: "Dish4",
        type: "Main",
        price: 15,
        cook_time_in_minutes: 20,
        restaurant_id: restaurant_ids[1]
      },
      {
        name: "Dish5",
        type: "Side",
        price: 1,
        cook_time_in_minutes: 10,
        restaurant_id: restaurant_ids[1]
      },
      {
        name: "Dish6",
        type: "Side",
        price: 24,
        cook_time_in_minutes: 5,
        restaurant_id: restaurant_ids[1]
      },
      {
        name: "Dish7",
        type: "Desert",
        price: 22,
        cook_time_in_minutes: 3,
        restaurant_id: restaurant_ids[1]
      }
    ])
}
