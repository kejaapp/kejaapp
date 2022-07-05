const express = require('express');
const User = require('../model/user.js');
const { db } = require('../model/user');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get id from user
    const {email} = req.body;
    //check if user exists in db
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(401).send('no account found')
    }
    try{
        const query = {email:email};
        const update = { $set: {status:'verified'}};
        const options = { };
        
        db.collection('users').updateOne( query, update, options);
        return res.status(200).send('verification successful')
    }catch(err){
        console.log(err);
    }
    //return a confirmation 
})
module.exports = router;