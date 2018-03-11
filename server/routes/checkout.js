"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    const food_id = req.body.foodID;
    const rest_id = req.body.restID;

    const user_id = 2;

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
        res.json({order: checkoutFoods});
      })
      .catch((err) => {
        console.log(err.message);
      });

  });

  router.post("/delete", (req, res) => {
    console.log('in the server')
    const food_id = req.body.foodID;
    console.log(food_id)
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
    DataHelpers.getCheckoutCart()
      .then((cart) => {
        res.json({order: cart})
      })
  })

  return router;
};
