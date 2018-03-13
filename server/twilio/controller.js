require('dotenv').config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

//formats phone nuber into (###) ### ####
const normalize = (phone) => {
  //normalize string and remove all unnecessary characters
  phone = phone.replace(/[^\d]/g, "");
  //check if number length equals to 10
  if (phone.length == 10) {
    //reformat and return phone number
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return null;
}

//Parse incoming order info and return an object with necessary info needed to compose SMS msg
const parseInfo = (checkoutInfo) => {
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

  const outputInfo = {
    orderID,
    foodNames,
    total,
    time,
    restaurantName,
    restaurantNum
  }

  return outputInfo;
}

//Send a SMS msg using Twilio api
const sendTwilioMsg = (msg, toNum, fromNum) => {
  client.messages.create({
    body: msg,
    to: toNum,  // Text this number
    from: fromNum // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.log(err.message))
}

module.exports = {
  msgCustomer: (checkoutInfo) => {
    const info = parseInfo(checkoutInfo);
    const msg = `-\n\nThank you for your order! Your order number is: ${info.orderID}.\n\nYou've ordered ${info.foodNames}totalling $${info.total} from ${info.restaurantName}.\n\n` +
      `Your food will be ready in ${info.time} minutes.\n\nIf you would like to contact the restaurant, please call ${info.restaurantNum}`
    
    sendTwilioMsg(msg, process.env.TWILIO_TEST_CUS, process.env.TWILIO_PHONE);
  },

  msgOwner: (checkoutInfo) => {
    const info = parseInfo(checkoutInfo);
    const msg = `-\n\nNew order placed! Order number: ${info.orderID}.\n\nDishes ordered: ${info.foodNames}totalling $${info.total}.\n\n` +
      `Promised to be ready in ${info.time} minutes.`

    sendTwilioMsg(msg, process.env.TWILIO_TEST_OWN, process.env.TWILIO_PHONE);
  }
}



