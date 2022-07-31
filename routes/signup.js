const express = require('express');
const User = require('../model/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const { VerifyGoogleAuthToken } = require('../middleware/googleauth');
const nodemailer = require('nodemailer');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mobile = process.env.TWILIO_MOBILE;
const client = require('twilio')(accountSid, authToken);

let router = express.Router()

router.post('/',async (req,res,next)=>{
    //get email,password,name from req.body
    const { user } = req.body;
    const email = user.email
    //check if all params are available
    if(!email){
        return  res.status(201).send('all inputs are required');
    }
    //check if user already exists
    const existingUser = await User.findOne({email});
    
    //console.log(existingUser)

    if(existingUser){
        return res.status(201).send('User already exists, please log in');
    }
    //sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encryptpassword = bcrypt.hashSync(user.password, salt);
    // const encryptpassword = await bcrypt.hash(user.password,10);
    //console.log(encryptpassword)
    try{
        const token = jwt.sign(
            {email},
            process.env.TOKEN_KEY,
            {
                expiresIn: '2d'
            }
        )
        //console.log(token)
        const newUser = await User.create({
            name: user.name ,
            email: email,
            password: encryptpassword,
            access_token: token,
            photo: "",
            mobile: user.mobile,
            gender: "",
            school: "",
            code: user.mobile,
            visitcount: 0,
            referredcount: 0,
            tier: "user",
            status: "unverified",
            substatus: false,
            subexpirytime: ""
        })
        //console.log(newUser)
        //send email for verification
        client.messages
          .create({body: `Welcome ${user.name}, to the keja community.

Are you a Landlord or an agent? 
Market your apartment in minutes for FREE and let tenants find you easily . Click the link below to start.
https://www.keja.app/listing

Are you a student? 
Help us grow our platform by reviewing your apartment or earn by referring your landlord to us and get redeemable tokens. Click the link below to learn more.
https://www.keja.app/help/refer

For any inquiries email us or contact us at +254771712005 ,call,sms,whatsapp us.`, from: mobile, to: `+254${user.mobile}`})
          .then(message => console.log(message.sid));
        // const msg = {
        //     to: email,
        //     from: "keja.appp@gmail.com",
        //     subject: "Welcome to keja community",
        //     text:"find us at https://www.keja.app/",
        //     html: ` <img src='https://res.cloudinary.com/www-keja-app/image/upload/v1658234186/m1ngnyqajjuwl2xzppbr.png' /> <br/> <h1> Hi, ${user.name}! Welcome to the Keja Community. </h1> <br/> <p> We are thrilled to have you join us on our journey. </p> <br/> <p> You can discover, search and find apartments at the comfort of your home. </p> <br/> <p> Click the link to complete the registration by verifying your account.</p> <br/> <p> https://www.keja.app/verify/${email}</p>`,
        // };
        // console.log(msg)
        // sgMail.send(msg)
        //   .then((response) => {
        //     console.log(response)
        //     console.log(response[0].statusCode)
        //     console.log(response[0].headers)
        //   })
        //   .catch((error) => {
        //     console.error(error)
        //   })
       
        return res.status(200).json(newUser.access_token)
        //console.log(newUser.access_token);
    }catch(err){
        res.status(201).send('Could not sign up user, try again')
    }
    return res.status(200);
});

router.post('/google',async (req,res)=>{
    //get auth client from header
    let token = req.headers.authorization;
    //check if user exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(401).send('Your account already exists, try logging in')
    }
    //create user 
    //get details from google
    const {name,email,picture} = await VerifyGoogleAuthToken(token)
    //create new user acc
    const user = await User.create({
        name: name ,
        email: email.toLowerCase(),
        password: encryptpassword,
        access_token: token,
        photo: picture,
        mobile: 0,
        gender: "",
        school: "",
        code: 0,
        visitcount,
        tier: "user",
        status: "unverified",
        substatus: false,
        subexpirytime: "",
        createdAt: time
    })
    console.log(user)
    //send email for verification
    res.status(200)
    console.log(user);
    //send email
})
module.exports = router;