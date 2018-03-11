module.exports = (knex) => {

  const orderData = {
    food_id: null,
    restaurant_id: null,
    order_id: null
  }

  const saveCheckoutItem = (food_id, order_id) => {
    return knex.select("food_id").from("checkout")
      .where("food_id", food_id)
      .then((result) => {
        if (result.length === 0) {
          return knex("checkout")
            .insert({
              order_id: order_id,
              food_id: food_id,
              quantity: 2
            })
            .returning("id")
            .then((id)=> {
              // console.log("item inserted", id[0]);
              return [id[0], order_id];
            });
        } else {
          return knex("checkout")
            .returning("id")
            .where("food_id", food_id)
            .increment("quantity", 1)
            .then((id)=> {
              // console.log("item updated")
              // console.log([id[0], order_id]);
              return [id[0], order_id];
            })
        }
      });
  }

  return {
    //READs
    getRestaurants: () => knex("restaurant").limit(10),
    getFoods: (id) => knex("food").where("restaurant_id", id).limit(10),
    getCheckoutCart: (data) => {
      // console.log("inside getcheckout");
      // console.log("data: ", data);
      //SELECT food.* FROM checkout INNER JOIN food ON food.id = checkout.food_id WHERE order_id = order_id;
      return knex.select("food.*", "quantity").from("checkout").innerJoin("food", "food.id", "checkout.food_id").where("order_id", orderData.order_id)
        .then((result) => {
          // console.log("in getcart: ",result);
          return result;
          // console.log(result)
        })
    },

    //ADDs
    // makeOrder: (rest_id, user_id, food_id) => {
    //   const findOrderForUser = () => knex.first('*').where("user_id", user_id).from('order')
    //   const createNewOrderOrReturnExisting = findOrderForUser()
    //     .then((order) => {
    //       if(order) return order.id;
    //       return knex("order")
    //         .return("*")
    //         .insert({
    //           restaurant_id: rest_id,
    //           user_id: user_id,
    //           status: "new"              
    //         })
    //         .then((order) => order[0].id);
    //     });
    //   const checkoutItem = createNewOrderOrReturnExisting
    //     .then(order_id => {
    //       return saveCheckoutItem(food_id, order_id)
    //     })
    makeOrder: (rest_id, user_id, food_id) => {
      return knex.select("*").from("order")
        .where("user_id", user_id)
        .then((result) => {
          if (!result) {
            return knex("order")
              .returning("id")
              .insert({
                restaurant_id: rest_id,
                user_id: user_id,
                status: "new"
              })
              .then((id)=> {
                // const order_id = id[0].id;
                orderData.order_id = id[0].id;
                orderData.restaurant_id = id[0].restaurant_id;
                orderData.user_id = id[0].user_id;
                console.log("record inserted", id);
                return saveCheckoutItem(food_id, order_id);
              })
          } else {
            return knex("order")
              .returning("id")
              .then((id)=> {
                const order_id = id[0].id;
                orderData.order_id = id[0].id;
                orderData.restaurant_id = id[0].restaurant_id;
                orderData.user_id = id[0].user_id;
                console.log("returned id", id);
                return saveCheckoutItem(food_id, order_id)
                  .then((data) => {
                    // console.log("makeorder's: ", data);
                    return data;
                  })
              });
          }
        })
    },
    // (RestaurantID, UserID, FoodID) -> Promise<CheckoutItem>
    // makeOrder: async (rest_id, user_id, food_id) => {
    //   // Order?
    //   const maybeOrder = await knex.first('*').where({user_id}).from('order');

    //   // [Order]
    //   const orders = maybeOrder ? [maybeOrder] : await knex("order")
    //         .return("*")
    //         .insert({
    //           restaurant_id: rest_id,
    //           user_id: user_id,
    //           status: "new"              
    //         });
    //   // OrderId
    //   const order_id = orders[0].id;
      
    //   // Promise<CheckoutItem>
    //   return saveCheckoutItem(food_id, order_id);

    // },

    removeCheckoutItem: (food_id) => {
      return knex.select("food_id", "quantity").from("checkout")
        .where("food_id", food_id)
        .then((result) => {
          if (result[0].quantity > 1) {
            return knex("checkout")
              .where("food_id", food_id)
              .decrement("quantity", 1)
              // .then(()=> console.log("record deleted"));
          } else {
            return knex("checkout")
              .where("food_id", food_id)
              .del()
              // .then(()=> console.log("row deleted"));
          }
        })
    },

    //DELETE
    emptyCart: () => {
      return knex("checkout").where("order_id", orderData.order_id).del();
    }

    //TWILIO
  }
}