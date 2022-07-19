const express = require('express');
const User = require('../model/user');
const { db } = require('../model/user');
let router = express.Router();

router.post('/',async (req,res)=>{
    //get email
    const { email } = req.body;
    //console.log(email);
    //check if email exists
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(201).send('no account found please log in');
    }
    //updtate tier
    if(user.tier === 'listing'){
        return res.status(201).send('This account already exists, Kindly login ')
    }
    try{
        const query = {email:email};
        const update = { $set: {tier:'listing'}};
        const options = { };
        
        db.collection('users').updateOne( query, update, options);
        return res.status(200).send('Listing account created successful');
    }catch(err){
        //console.log(err)
        return res.status(201).send('couldnt register lister')
    }

})

module.exports = router;