const express = require('express');
const User = require('../model/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const { VerifyGoogleAuthToken } = require('../middleware/googleauth');
const nodemailer = require('nodemailer');

require('dotenv').config();

let router = express.Router()

router.post('/',async (req,res,next)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        secure: true, // TLS requires secureConnection to be false
        port: 465, // port for secure SMTP
        auth: {
            user: 'keja.appp@gmail.com',
            pass: 'nickelodeon@77'
        }
    });

    //get email,password,name from req.body
    const { user } = req.body;
    const email = user.email
    //console.log(user.name)
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
    const encryptpassword = await bcrypt.hash(user.password,10);
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
        let mailOptions = {
            from: 'keja.app@outlook.com',
            to: email,
            subject: 'Keja App Account Registration',
            text:"find us at https://www.keja.app/",
            html: ` <img src='http://res.cloudinary.com/www-keja-app/image/upload/v1657104669/a8uwwg8mtnjutti2bzqh.jpg' /> <br/> <h1> Hi, ${user.name}! Welcome to the Keja Community. </h1> <br/> <p> Thank you for signing up and we are thrilled to have you join us on our journey. </p> <br/> <p> You can discover, search and find apartments at the comfort of your home. </p> <br/> <p> Click the link to complete the registration by verifying your account.</p> <br/> <p> https://www.keja.app/verify/${email}</p>`,
        };

        transporter.sendMail(mailOptions,
            function(error,info){
                if(error){
                    console.log(error);
                }
                return res.status(200)
            //    return console.log('Email sent:')
            })
        res.status(200).json(newUser.access_token)
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