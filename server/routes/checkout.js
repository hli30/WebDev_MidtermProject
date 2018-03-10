"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    //save data
    let food = JSON.parse(req);
    DataHelpers.saveCheckoutItem(food)
      .then(() => {
        
      })
    //
    DataHelpers.getCheckoutCart()
      .then((checkoutItems) => res.json({order: checkoutItems}))
  })

  return router;
}