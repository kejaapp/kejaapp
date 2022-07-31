const express = require('express');
const Property = require('../model/property');
const { db } = require('../model/property');
const router = express.Router();

router.post('/',async(req,res)=>{
	//get confirmation status from payment
	const { details }=req.body;
	console.log(details)
	//get property details
	const existingproperty = await Property.findOne({_id:details.id});
	//find property
	if(!existingproperty && existingproperty === null){
        return res.status(401).send('no property found')
    }
    console.log(existingproperty)
    //update property sponsored status
    try{
        const query = {_id:existingproperty._id};
        const update = { $set: {
            sponsored:true
        }};
        const options = { };
        
        db.collection('properties').updateOne( query, update, options);

        return res.status(200);
    }catch(err){
        //console.log(err)
    }
	//update property status
})

module.exports = router;