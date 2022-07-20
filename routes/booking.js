const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router()

router.post('/',async(req,res)=>{
	const { request } = req.body;

	//console.log(request)
let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: true, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
        ciphers:'SSLv3'
        },
        auth: {
            user: 'keja.app@outlook.com',
            pass: 'nickelodeon@77'
        }
    });
    let mailOptions = {
            from: 'keja.app@outlook.com',
            to: "sammymusembi77@gmail.com",
            subject: 'Booking Request',
            text:` email : ${request.email}, date: ${request.date}, houseId: ${request.Hid}, phone: ${request.mobile}, content: ${request.body} `
        };
        // let mailOptions1 = {
        //     from: 'keja.app@outlook.com',
        //     to: report.email,
        //     subject: 'Report submitted successfully',
        //     text:`Your request has been received we will contact you as soon as possible, incase of any queries call us or whatsapp us at 0771712005. Thank you for being a wonderful customer`
        // };

        transporter.sendMail(mailOptions,
            function(error,info){
                if(error){
                    console.log(error);
                }
                return res.status(200)
            //    return console.log('Email sent:')
            })
    return res.status(200)
})

module.exports = router;