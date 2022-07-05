const express = require('express');
const User = require('../model/user.js');

require('dotenv').config();

let router = express.Router();

router.post('/', async(req,res)=>{
    //get details from user
    const { email } = req.body;
    //find user exists
    if(!(email)){
        return res.status(401).send('all inputs are required');
    }
    const existingUser = await User.findOne({email:email});
    //console.log(existingUser);
    //compare passwords
    if(existingUser.tier === 'listing'){
        //create a refresh token
        return res.status(200).send('successfully logged in');
    }
    return res.status(401).send('No account found please create a listing account');

})

module.exports = router;