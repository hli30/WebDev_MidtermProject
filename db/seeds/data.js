exports.seed = function(knex, Promise) {
  return deleteTables(knex)
    .then(() => seedUser(knex))
    .then((user_ids) => seedRestaurant(knex, user_ids))
    .then((user_restaurant_ids) => seedOrder(knex, user_restaurant_ids))
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

const seedRestaurant = (knex, user_ids) => {
  return knex("restaurant")
    .returning("id")
    .insert([
      {
        name: "SomePlace",
        description: "a restaurant",
        type: "comfort",
        phone_number: "1234567890",
        address: "321 street",
        email: "test@test.com",
        user_id: user_ids[1]
      },
      {
        name: "anotherPlace",
        description: "another restaurant",
        type: "fast food",
        phone_number: "1114567890",
        address: "333 street",
        email: "test@test.com",
        user_id: user_ids[2]
      }
    ])
    .then((restaurant_ids) => {
      return [user_ids, restaurant_ids];
    })
}

const seedOrder = (knex, user_restaurant_ids) => {
  return knex("order")
    .insert({
      user_id: user_restaurant_ids[0][0],
      restaurant_id: user_restaurant_ids[1][0]
    })
    .then(() => {
      return user_restaurant_ids[1];
    })
}

const seedFood = (knex, restaurant_ids) => {
  return knex("food")
    .insert([
      {
        name: "apple",
        type: "app",
        price: 12.5,
        cook_time_in_minutes: 5,
        restaurant_id: restaurant_ids[0]
      },
      {
        name: "food2",
        type: "main",
        price: 1.5,
        cook_time_in_minutes: 3,
        restaurant_id: restaurant_ids[0]
      },
      {
        name: "meat",
        type: "side",
        price: 10,
        cook_time_in_minutes: 10,
        restaurant_id: restaurant_ids[0]
      },
      {
        name: "chicken",
        type: "main",
        price: 15,
        cook_time_in_minutes: 60,
        restaurant_id: restaurant_ids[1]
      },
      {
        name: "stuff",
        type: "dessert",
        price: 1,
        cook_time_in_minutes: 10,
        restaurant_id: restaurant_ids[1]
      },
      {
        name: "fries",
        type: "side",
        price: 24,
        cook_time_in_minutes: 20,
        restaurant_id: restaurant_ids[1]
      },
      {
        name: "salad",
        type: "side",
        price: 22,
        cook_time_in_minutes: 3,
        restaurant_id: restaurant_ids[1]
      }
    ])
}
