module.exports = (knex) => {
  return {
    //READs
    getRestaurants: () => knex("restaurant").limit(10),
    getFoods: (id) => knex("food").where("restaurant_id", id).limit(10),
    getCheckoutCart: () => knex("checkout").innerJoin("food", "food_id", "id"),

    //ADDs
    saveCheckoutItem: (food_id, order_id) => {
      console.log (food_id);
      return knex.select("food_id").from("checkout")
        .where("food_id", food_id)
        .then((result) => {
          console.log (result);
          if (result.length === 0) { //means you are going to insert the item
            knex("checkout")
              .insert({
                order_id: order_id[0],
                food_id: food_id,
                quantity: 2
              })
              .returning("id")
              .then((id)=>{
                console.log("record inserted");
              });
            } else { //means you are going to update it.
              knex("checkout")
              .where("food_id",food_id)
              .update({
                quantity: 5
              }).then(count=>{
                console.log("record updated");
              });
            }
        });
    },

    makeOrder: (restID, userID) => {
      return knex("order")
        .returning("id")
        .insert({restaurant_id: restID, user_id: userID})
    },

    //TWILIO
  }
}