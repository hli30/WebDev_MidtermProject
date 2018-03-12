"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    const food_id = req.body.foodID;
    const rest_id = req.body.restID;

<<<<<<< HEAD
    const user_id = 1;
=======
    const user_id = 2;
>>>>>>> 38ede1884ab3a3a2c950b9b9bfde8b3a34e37aca

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
        return DataHelpers.updateOrderAndResetCart();
      });
  });

  return router;
};
