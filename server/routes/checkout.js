"use strict";

const express = require("express");
const router  = express.Router();
const twilio = require("../twilio/controller");

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    const food_id = req.body.foodID;
    const rest_id = req.body.restID;

    const user_id = 2;

    DataHelpers.makeOrder(rest_id, user_id, food_id)
      .then(() => {
        return DataHelpers.getCheckoutCart();
      })
      .then((checkoutFoods) => {
        console.log("checkout is:", checkoutFoods);
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
        console.log(info);
        res.json({
          restaurant: info[0],
          orderID: info[1],
          order: info[2]
        })
        console.log("before twilio")
        twilio.msgCustomer(info);
        console.log("after twilio")
        return DataHelpers.updateOrderAndResetCart();
      })
  });

  return router;
};
