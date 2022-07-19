const express = require('express');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mobile = process.env.TWILIO_MOBILE;

const client = require('twilio')(accountSid, authToken);

const router = express.Router();

router.post('/',async(req,res)=>{
	//get the context
	const { report } = req.body;
	
	console.log(report)
	//send an email
	if(!report.email && !report.mobile){
		return res.status(201).send('please provide an email or a contact')
	}
	//send a whatsapp message
	client.messages
      .create({body: ` email : ${report.email}, date: ${report.date}, houseId: ${report.Hid}, phone: ${report.mobile}, complaint: ${report.body} `, from: `${mobile}`, to: '+254759233322'})
      .then(message => console.log(message.sid));

    client.messages
      .create({body:'Your complaint has been submitted it shall be reviewed. Sorry for any inconvinence and thank you for being part of our Keja community' , from: `${mobile}`, to: `${report.mobile}`})
      .then(message => console.log(message.sid));

	//return a res status
})

module.exports = router;