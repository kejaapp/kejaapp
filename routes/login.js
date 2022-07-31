const express = require('express');
const User = require('../model/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../model/user');
require('dotenv').config();

let router = express.Router();

router.post('/', async(req,res)=>{
    //get details from user
    const { user } = req.body;
    //find user exists
    const email = user.email;
    if(!(user)){
        return res.status(201).send('all inputs are required');
    }
    const existingUser = await User.findOne({email:email});
    console.log(user.password);
    if(!existingUser){
        return res.status(201).send('no account found please register an account or enter the right email')
    }
    let id = existingUser._id
    //compare passwords
    if(bcrypt.compareSync(user.password , existingUser.password)){
        //create a refresh token
        const token = jwt.sign(
            {email,id},
            process.env.TOKEN_KEY,
            {
                expiresIn:'2d',
            }
        )
        //console.log(token)
        //update access token
        try{
            const query = {email:email};
            const update = { $set: {access_token:token}};
            const options = { };
            
            db.collection('users').updateOne( query, update, options);
            //login user
            return res.status(200).send(token);
        }catch(err){
            console.log(err)
        }
    }
    return res.status(201).send('Wrong password, please try again');

})

module.exports = router;