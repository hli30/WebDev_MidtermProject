module.exports = (knex) => {
  return {
    //READs
    getRestaurants: () => knex("restaurant").limit(10),
    getFoods: (id) => knex("food").where("restaurant_id", id).limit(10),
    getCheckoutCart: () => knex("checkout").innerJoin("food", "food_id", "id"),

    //ADDs
    saveCheckoutItem: (item) => knex("checkout").insert({data}),
    saveOrder: (data) => knex("order").insert({data}),

    //TWILIO
    
  }
}