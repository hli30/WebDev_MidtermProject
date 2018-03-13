require('dotenv').config();
// const request = require("request");
const rp = require("request-promise");

const zomatoKey = process.env.ZOMATO_KEY;

const options = {
  uri: "https://developers.zomato.com/api/v2.1/search?count=20&lat=49.2827291&lon=-123.1207375&radius=1000",
  headers: {
    "Accept": "application/json",
    "user-key": process.env.ZOMATO_KEY
  }
}

const generateRandPhoneNum = () => {
  let number = "604" + Math.floor((Math.random() * (9999999-1000000+1)) + 1000000);
  return number;
}

const getInfo = () => {
  let seeds = [];
  return rp(options)
    .then((body) => {
      const data = JSON.parse(body)
      data.restaurants.forEach((result) => {
        let seed = {
          name: result.restaurant.name,
          phone_number: generateRandPhoneNum(),
          address: result.restaurant.location.address
        }
        seeds.push(seed);
      })
      return seeds;
    })
    .catch((err) => console.log(err.message))
}

module.exports = {
  getRestaurantSeed: getInfo
}
