const express = require('express');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

require('dotenv').config();

const useremail = process.env.EMAIL;
const password = process.env.PASS;

const router = express.Router()

router.post('/',async(req,res)=>{
	const { request } = req.body;

	// console.log(request)
 //    console.log(typeof(password))
// let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com", // hostname
//         secure: true, // TLS requires secureConnection to be false
//         port: 465, // port for secure SMTP
//         auth: {
//             user: useremail,
//             pass: password
//         }
//     });
//     let mailOptions = {
//             from: 'keja.appp@gmail.com',
//             to: "sammymusembi77@gmail.com",
//             subject: 'Booking Request',
//             text:` email : ${request.email}, date: ${request.date}, houseId: ${request.Hid}, phone: ${request.mobile}, content: ${request.body} `
//         };
//         client.messages 

      client.messages
      .create({body: ` email : ${request.email}, date: ${request.date}, houseId: ${request.Hid}, phone: ${request.mobile}, content: ${request.body} `, from: '+15017122661', to: '+254759233322'})
      .then(message => console.log(message.sid));

        // transporter.sendMail(mailOptions,
        //     function(error,info){
        //         if(error){
        //             console.log(error);
        //         }
        //         return res.status(200)
        //     //    return console.log('Email sent:')
        //     })
    return res.status(200)
})

module.exports = router;