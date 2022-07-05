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
        return res.status(401).send('all inputs are required');
    }
    const existingUser = await User.findOne({email:email});
    //console.log(existingUser);
    let id = existingUser._id
    //compare passwords
    if(existingUser && bcrypt.compare(user.password , existingUser.password)){
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
    return res.status(401).send('No account found please signUp');

})

module.exports = router;