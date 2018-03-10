const dotenv = require('dotenv').config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCT_SID_TEST;
const authToken = process.env.TWILIO_AUTH_TOKEN_TEST;
const client = twilio(accountSid, authToken);

module.exports = (DataHelper) => {
  DataHelpers.getTwilioMsg()
    .then((msgObj) => {
      console.log(msgObj);
      const msg = ``;
      return msg;
    })
}


client.messages.create({
  body: 'Hello from Node',
  to: '+17788818291',  // Text this number
  from: '+15005550006' // From a valid Twilio number
})
.then((message) => console.log(message.sid))
.catch((err) => console.log(err.message))
