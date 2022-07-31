const express = require('express');
const User = require('../model/user');
const { db } = require('../model/user');

const router = express.Router();

router.post('/',async(req,res)=>{
	//get info for user
	const { edituser } = req.body;
	//console.log(edituser)
	//find existing user
	if(!edituser){
		return res.status(201).send('no changes were made')
	}
	//get user
	const existinguser = await User.findOne({email:edituser.email})
	if(!existinguser ){
		return res.status(201).send('could not find this account , try again in a few minutes')
	}
	//update user info
	try{
		const query = {_id:existinguser._id};
        const update = { $set: {
            name:           edituser.name,
		    mobile:         edituser.mobile,
		    gender:         edituser.gender,
		    school:         edituser.school,
		    email:          edituser.email,
        }};
        const options = { };
        
        db.collection('users').updateOne( query, update, options);
	}catch(err){
		console.log(err)
	}
	//return a success
	return res.status(200).send('successfully updated your profile');
})

module.exports = router ;