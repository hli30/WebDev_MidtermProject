"use strict";

const express = require('express');
const router  = express.Router();

module.exports = function (DataHelpers) {

  router.get("/", (req, res) => {
    DataHelpers.getRestaurants((err, restaurants) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({restaurants: restaurants});
      }
    })
  });

  router.get("/:id", (req, res) => {
    let id = req.params.id;
    DataHelpers.getFoods(id, (err, foods) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({menu: foods});
      }
    })
  });

  return router;
}
