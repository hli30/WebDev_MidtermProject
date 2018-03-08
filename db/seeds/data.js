exports.seed = function(knex, Promise) {
  return deleteTables(knex)
    .then(() => {
      return seedContact(knex)
    })
    .then(() => {
      return seedFood(knex)
    })
    .then(() => {
      return seedMenu(knex)
    })
    .then(() => {
      return seedRestaurant(knex)
    })
    .then(() => {
      return seedOwner(knex)
    })
    .then(() => {
      return seedCustomer(knex)
    })
};

const deleteTables = (knex) => {
  return knex("order").del()
    .then(() => {
      knex("customer").del()
      .then(() => {
        knex("owner").del()
      })
    })
    // knex("restaurant").del(),
    // knex("menu").del(),
    // knex("food").del(),
    // knex("contact").del(),
}

const seedContact = (knex) => {
  knex("contact")
    .returning("id")
    .insert([{
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
    .then((id) => {
      return Promise.all([
        knex("customer").insert({
          contact_id: id[0]
        }),
        knex("owner").insert({
          contact_id: id[1]
        })
      ])
    })
}

const seedCustomer = (knex) => {
  knex("customer")
    .returning("id")
    .insert({
      username: "testUser",
      password: "hashedpw"  
    })
    .then((id) => {
      return knex("order").insert({
        customer_id: id[0]
      })
    })
}

const seedOwner = (knex) => {
  knex("owner").insert({
    username: "testOwner",
    password: "hashedpw2"  
  })
}

const seedRestaurant = (knex) => {
  knex("restaurant")
    .returning("id")
    .insert({
      name: "SomePlace",
      description: "a restaurant",
      type: "comfort",
      phone_number: "1234567890",
      address: "321 street",
      email: "test@test.com"
    })
    .then((id) => {
      return Promise.all([
        knex("order").insert({
          restaurant_id: id[0]
        }),
        knex("owner").insert({
          restaurant_id: id[0]
        })
      ]);
    });
}

// const seedOrder = (knex) => {

// }

const seedMenu = (knex) => {
  knex("menu")
    .returning("id")
    .then((id) => {
      return knex("restaurant").insert({
        menu_id: id[0]
      })
    })
}

const seedFood = (knex) => {
  return knex("food")
    .returning("id")
    .insert({
      name: "apple",
      type: "app",
      price: 12.5,
      cook_time_in_minutes: 5
    })
    .then((id) => {
      return knex("menu").insert({
        food_id: id[0]
      })
    })
}