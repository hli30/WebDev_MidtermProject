"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelper) => {
  router.post("/:id", (req, res) => {
    let data = JSON.parse(res);
    DataHelper.saveOrder(data)
      .then(() => {

      })
  })

  router.post("/:id/checkout", (req, res) => {
    // let data = JSON.parse(res);
    // DataHelper.saveCheckout(data)
    //   .then(() => {
    //   })
  })
}
