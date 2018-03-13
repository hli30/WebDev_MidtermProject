"use strict";

const express = require('express');
const router  = express.Router();
const bodyparser = require("body-parser");

module.exports = (DataHelpers) => {

  router.get("/", (req, res) => {
    DataHelpers.getRestaurants()
      .then((restaurants) => res.json({restaurants: restaurants}))
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  router.get("/:id", (req, res) => {
    DataHelpers.getFoods(req.params.id)
      .then((foods) => res.json({menu: foods}))
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  return router;
};
