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
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
        ciphers:'SSLv3'
        },
        auth: {
            user: 'keja.app@outlook.com',
            pass: 'nickelodeon@77'
        }
    });

    //get email,password,name from req.body
    const { user } = req.body;
    const email = user.email
    //console.log(user.name)
    //check if all params are available
    if(!email){
        return  res.status(401).send('all inputs are required');
    }
    //check if user already exists
    const existingUser = await User.findOne({email});
    
    //console.log(existingUser)

    if(existingUser){
        return res.status(401).send('User already exists, please log in');
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
        //create a user
        //db('Keja').collection('users).insertOne
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
            subject: 'Welcome to our Keja Community ',
            text:`Click the link to complete verifying your account link: http://localhost:3000/verify/${email}`
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
        res.status(400).send('Could not sign up user, try again')
    }
    res.status(200);
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