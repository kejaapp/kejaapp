const express = require('express');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mobile = process.env.TWILIO_MOBILE;

const client = require('twilio')(accountSid, authToken);

const router = express.Router()

router.post('/',async(req,res)=>{
	const { request } = req.body;

	//console.log(request)

	client.messages
      .create({body: ` email : ${request.email}, date: ${request.date}, houseId: ${request.Hid}, phone: ${request.mobile}, content: ${request.body} `, from: `${mobile}`, to: '+254759233322'})
      .then(message => console.log(message.sid));

    client.messages
      .create({body:'Your request has been received we will contact you as soon as possible, incase of any queries call us or whatsapp us at 0771712005. Thank you for being a wonderful customer' , from: `${mobile}`, to: `${request.mobile}`})
      .then(message => console.log(message.sid));
    return res.status(200)
})

module.exports = router;