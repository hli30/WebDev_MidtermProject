"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    const food_id = req.body.foodID;
    // const rest_id = req.body.restID;
    // const food_id = 4;
    const rest_id = 1;
    const user_id = 2;

    DataHelpers.makeOrder(rest_id, user_id)
      .then((order_id) => DataHelpers.saveCheckoutItem(food_id, order_id))
      // .then(() => DataHelpers.getCheckoutCart())
      // .then((checkoutItems) => res.json({order: checkoutItems}))
      .catch((err) => {console.log(err.message)})
  })

  router.post("/:food_id/delete", (req, res) => {
    const food_id = req.params.food_id;

  })
    

  return router;
}