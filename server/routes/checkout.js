"use strict";

const express = require("express");
const router  = express.Router();
const twilio = require("../twilio/controller");

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    const food_id = req.body.foodID;
    const rest_id = req.body.restID;

    //Hardcoded test user_id as user login not implemented
    const user_id = 2;

    //Initiate a new order in db if it doesn't exist, and save each items 
    //into checkout table and send the current checkout data back to front-end
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

  //Deletes an item from the checkout table
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

  //Deletes the entire checkout table and the referenced order
  router.get("/emptycart", (req, res) => {
    DataHelpers.emptyCart()
      .then(() => {
        return DataHelpers.getCheckoutCart()
          .then((cart) => {
            res.json({order: cart});
          });
      })
  });

  //Sends to the front-end the current checkout info, sends SMS msg using twilio
  //then reset checkout and change the order status
  router.get("/submit", (req, res) => {
    DataHelpers.getCheckoutInfo()
      .then((info) => {
        console.log(info);
        res.json({
          restaurant: info[0],
          orderID: info[1],
          order: info[2]
        })
        // twilio.msgCustomer(info);
        twilio.msgOwner(info);
        return DataHelpers.updateOrderAndResetCart();
      })
  });

  return router;
};
