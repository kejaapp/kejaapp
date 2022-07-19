const express = require('express');
const Property = require('../model/property');
const { db } = require('../model/property');
const router = express.Router();

router.post("/",async(req,res)=>{
	//get property id 
	const {review} = req.body;

	//console.log(review.email)

	if(!review.email){
		return res.status(201).send('You did not submit all inputs of the review, check your inputs and try again.')
	}
	//use house id to look for property and push reviews to it
	//check if property exists
    const existingproperty = await Property.findOne({_id:review.Hid})
    
    //console.log(existingproperty.email)
    if(!existingproperty && existingproperty === null){
        return res.status(401).send('no property found, could not add this review')
    }
    console.log(existingproperty)
    //update property id
    reviewitem = {
        'email': review.email,
        'body': review.body
    }

    try{
        const query = {_id:existingproperty._id};
        const update = { $push: {"reviews": {"$each": [reviewitem]}}};
        const options = { };
        	  
        db.collection('properties').updateOne( query, update, options);
        //console.log('Success')
        return res.status(200);
    }catch(err){
        res.status(401).send(err)
    }
    return res.status(200)
	// get user
	
})
module.exports = router;