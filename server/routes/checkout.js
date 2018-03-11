"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    const food_id = req.body.foodID;
    const rest_id = req.body.restID;

    const user_id = 3;

    // async function returnCheckout() {
    //   await DataHelpers.makeOrder(rest_id, user_id, food_id);
    //   DataHelpers.getCheckoutCart();
    // }

    DataHelpers.makeOrder(rest_id, user_id, food_id)
      .then((data) => {
        return DataHelpers.getCheckoutCart(data);
      })
      .then((checkoutFoods) => {
        // console.log("checkout is:", checkoutFoods);
        res.json({order: checkoutFoods})
      })
      .catch((err) => {
        console.log(err.message)
      })
    
  })

  router.delete("/delete", (req, res) => {
    const food_id = req.body.foodID;
    DataHelpers.removeCheckoutItem(food_id);
  });

  router.get("/emptycart", (req, res) => {
    DataHelpers.emptyCart()
  });
    
  return router;
}