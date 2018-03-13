require('dotenv').config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

//formats phone nuber into (###) ### ####
function normalize(phone) {
  //normalize string and remove all unnecessary characters
  phone = phone.replace(/[^\d]/g, "");
  //check if number length equals to 10
  if (phone.length == 10) {
    //reformat and return phone number
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return null;
}



module.exports = {
    msgCustomer: (checkoutInfo) => {
      // console.log("twilio's info", checkoutInfo);
      const restaurant = checkoutInfo[0][0];
      const orderID = checkoutInfo[1];
      const order = checkoutInfo[2];

      let foodNames = "";
      order.forEach((food) => {
        foodNames += food.name + ", ";
      })

      let total = 0;
      order.forEach((food) => {
        total += Number(food.price);
      })

      let time = 0;
      order.forEach((food) => {
        time += Number(food.cook_time_in_minutes);
      })
      
      const restaurantName = restaurant.name;
      const restaurantNum = normalize(restaurant.phone_number);

      const msg = `-\n\nThank you for your order! Your order number is: ${orderID}.\n\nYou've ordered ${foodNames} totalling $${total} from ${restaurantName}.\n\n` +
        `Your food will be ready in ${time} minutes.\n\nIf you would like to contact the restaurant, please call ${restaurantNum}`

      client.messages.create({
        body: msg,
        to: process.env.TWILIO_TEST_CUS,  // Text this number
        from: process.env.TWILIO_PHONE // From a valid Twilio number
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err.message))
    },

    msgOwner: (checkoutInfo) => {
      const restaurant = checkoutInfo[0][0];
      const orderID = checkoutInfo[1];
      const order = checkoutInfo[2];

      let foodNames = "";
      order.forEach((food) => {
        foodNames += food.name + ", ";
      })

      let total = 0;
      order.forEach((food) => {
        total += Number(food.price);
      })

      let time = 0;
      order.forEach((food) => {
        time += Number(food.cook_time_in_minutes);
      })
      
      const restaurantNum = normalize(restaurant.phone_number);

      const msg = `-\n\nNew order placed! Order number: ${orderID}.\n\nDishes ordered: ${foodNames} totalling $${total}.\n\n` +
        `Promised to be ready in ${time} minutes.`

      client.messages.create({
        body: msg,
        to: process.env.TWILIO_TEST_OWN,  // Text this number
        from: process.env.TWILIO_PHONE // From a valid Twilio number
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err.message))
    }
}


