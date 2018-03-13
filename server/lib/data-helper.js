module.exports = (knex) => {

  let orderData = {
    food_id: null,
    restaurant_id: null,
    order_id: null
  }

  const saveCheckoutItem = () => {
    return knex.select("food_id").from("checkout")
      .where("food_id", orderData.food_id)
      .andWhere("order_id", orderData.order_id)
      .then((result) => {
        if (result.length === 0) {
          return knex("checkout")
            .insert({
              order_id: orderData.order_id,
              food_id: orderData.food_id,
              quantity: 1
            })
            .then(() => {
              console.log("food inserted into cart");
            })
            // .returning("id")
        } else {
          return knex("checkout")
            // .returning("id")
            .where("food_id", orderData.food_id)
            .andWhere("order_id", orderData.order_id)
            .increment("quantity", 1)
            .then(() => {
              console.log("food incremented");
            })
        }
      });
  }
  
  const getCheckoutCart = () => {
    //SELECT food.* FROM checkout INNER JOIN food ON food.id = checkout.food_id WHERE order_id = order_id;
    return knex.select("food.*", "quantity").from("checkout").innerJoin("food", "food.id", "checkout.food_id").where("order_id", orderData.order_id)
      .then((result) => {
        console.log(orderData);
        return result;
      })
  }

  const getRestaurantsForOrder = () => knex("restaurant").where("id", orderData.restaurant_id)

  return {
    //READs
    getRestaurants: () => knex("restaurant").limit(10),
    getFoods: (id) => knex("food").where("restaurant_id", id).limit(10),
    getCheckoutCart: getCheckoutCart,
    getCheckoutInfo: () => {
      return Promise.all([
        getRestaurantsForOrder(),
        orderData.order_id,
        getCheckoutCart()
      ])
    },

    //ADDs
    makeOrder: (rest_id, user_id, food_id) => {
      return knex.select("*").from("order")
        .where("user_id", user_id)
        .andWhere("status", "not ready")
        .then((result) => {
          if (result.length === 0) {
            return knex("order")
              .returning("id")
              .insert({
                restaurant_id: rest_id,
                user_id: user_id,
                status: "not ready"
              })
              .then((id) => {
                orderData.order_id = id[0];
                orderData.restaurant_id = rest_id;
                orderData.food_id = food_id;
                console.log("record inserted", orderData);
                return saveCheckoutItem();
              })
          } else {
            return knex("order")
              .then((id) => {
                orderData.food_id = food_id;
                orderData.restaurant_id = rest_id;
                orderData.food_id = food_id;
                console.log("record exist", orderData);
                return saveCheckoutItem()
              })
          }
        })
    },

    //DELETE
    removeCheckoutItem: (food_id) => {
      return knex.select("food_id", "quantity").from("checkout")
        .where("food_id", food_id)
        .then((result) => {
          if (result[0].quantity > 1) {
            return knex("checkout")
              .where("food_id", food_id)
              .decrement("quantity", 1)
          } else {
            return knex("checkout")
              .where("food_id", food_id)
              .del()
          }
        })
    },

    emptyCart: () => {
      return knex("checkout").where("order_id", orderData.order_id).del()
        .then(() => {
          return knex("order").where("id", orderData.order_id).del();
        })
    },

    //RESET
    updateOrderAndResetCart: () => {
      knex("order")
        .where("id", orderData.order_id)
        .update({
          status: "submitted"
        })
        .then(() => {
          orderData = {
            food_id: null,
            restaurant_id: null,
            order_id: null
          }
        });     
    }
  }
}