const express = require('express');
const User = require('../model/user');
const { db } = require('../model/user');

let router = express.Router()

router.post("/",async (req,res)=>{
    //get user tokens
    const { token } = req.body;

    //console.log(token)
    //validate property
    if(!token){
        return res.status(401).send('no token found')
    }
    //check if user exists
    const existinguser = await User.findOne({access_token:token})
    
    if(!existinguser && existinguser === null){
        return res.status(201).send('no user found')
    }
    //console.log(existinguser.name)
    try{
        db.collection('users').findOneAndDelete({_id:existinguser._id} );
        //delete user
        console.log('deleted')
        res.status(200).send('success');
    }catch(err){
        console.log(err)
    }
    return res.status(200)
})

module.exports = router;