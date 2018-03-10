"use strict";

const express = require('express');
const router  = express.Router();
const bodyparser = require("body-parser");

module.exports = (DataHelpers) => {

  router.post("/:rest_id/orders", (req, res) => {
    // we get rest_id from params
    // we get user_id from cookie
    // we get all checkouts from the incoming body data or wherever (JSON ,blah blah)
  })

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
