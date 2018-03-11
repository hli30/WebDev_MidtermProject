"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    const food_id = req.body.foodID;
    const rest_id = req.body.restID;

    const user_id = 1;

    DataHelpers.makeOrder(rest_id, user_id, food_id)
      .then((data) => {
        return DataHelpers.getCheckoutCart(data);
      })
      .then((checkoutFoods) => {
        // console.log("checkout is:", checkoutFoods);
        res.json({order: checkoutFoods});
      })
      .catch((err) => {
        console.log(err.message);
      });

  });

  router.post("/delete", (req, res) => {
    const food_id = req.body.foodID;
    DataHelpers.removeCheckoutItem(food_id)
      .then(() => {
        return DataHelpers.getCheckoutCart()
          .then((cart) => {
            res.json({order: cart});
          });
      })
  });

  router.get("/emptycart", (req, res) => {
    DataHelpers.emptyCart()
      .then(() => {
        return DataHelpers.getCheckoutCart()
          .then((cart) => {
            res.json({order: cart});
          });
      })
  });

  router.get("/submit", (req, res) => {
    DataHelpers.getCheckoutInfo()
      .then((info) => {
        res.json({
          restaurant: info[0],
          orderID: info[1],
          order: info[2]
        })
      });
  });

  return router;
};
