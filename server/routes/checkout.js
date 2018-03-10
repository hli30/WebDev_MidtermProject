"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  router.post("/", (req, res) => {
    const food = req.body.foodID;
    
    DataHelpers.saveCheckoutItem(food)
      .then(() => {
        
      })
    
    DataHelpers.getCheckoutCart()
      .then((checkoutItems) => res.json({order: checkoutItems}))
  })

  return router;
}