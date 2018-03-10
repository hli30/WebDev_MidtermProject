"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  router.post("/:rest_id/orders", (req, res) => {
    // we get rest_id from params
    // we get user_id from cookie
    // we get all checkouts from the incoming body data or wherever (JSON ,blah blah)
  })

  router.get("/", (req, res) => {
    DataHelpers.getRestaurants()
      .then((restaurants) => res.json({restaurants: restaurants}))
<<<<<<< HEAD:server/routes/restaurant.js
      .catch((err) => res.status(500).json({error: err.message}))
=======
      .catch((err) => res.status(500).json({ error: err.message }));
>>>>>>> dev:server/routes/main.js
  });

  router.get("/:id", (req, res) => {
    DataHelpers.getFoods(req.params.id)
      .then((foods) => res.json({menu: foods}))
<<<<<<< HEAD:server/routes/restaurant.js
      .catch((err) => res.status(500).json({error: err.message}))
=======
      .catch((err) => res.status(500).json({ error: err.message }));
>>>>>>> dev:server/routes/main.js
  });

  return router;
};
