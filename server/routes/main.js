"use strict";

const express = require('express');
const router  = express.Router();

module.exports = function (DataHelpers) {

  router.get("/", (req, res) => {
    DataHelpers.getRestaurants((err, restaurants) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log("raw rows: ", restaurants);

        res.json({restaurants: restaurants});
      }
    })
  });

  return router;
}
