const express = require('express');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mobile = process.env.TWILIO_MOBILE;
const client = require('twilio')(accountSid, authToken);

require('dotenv').config();

const router = express.Router()

router.post('/',async(req,res)=>{
	const { request } = req.body;
      client.messages
      .create({body: `date: ${request.date}, houseId: ${request.Hid}, phone: ${request.mobile}, content: ${request.body} `, from: mobile, to: '+254759233322'})
      .then(message => console.log(message.sid));
    return res.status(200).send("Your request has ")
})

module.exports = router;