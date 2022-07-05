const express = require('express');
const Property = require('../model/property');
const { db } = require('../model/property');
let router = express.Router()

router.post("/",async (req,res)=>{
    //get property details
    const { editedproperty } = req.body;

    //console.log(editedproperty.id)
    //validate property
    if(!editedproperty){
        return res.status(401).send('all inputs are required')
    }
    //check if property exists
    const existingproperty = await Property.findOne({_id:editedproperty.id})
    
    //console.log(existingproperty.email)
    if(!existingproperty && existingproperty === null){
        return res.status(401).send('no property found')
    }
    //update property id
    try{
        const query = {_id:existingproperty._id};
        const update = { $set: {
            name:editedproperty.name,
            price:editedproperty.price,
            type:editedproperty.type,
            size:editedproperty.size,
            mobile:editedproperty.mobile,
            description:editedproperty.description,
            amenities:editedproperty.amenities,
            policies:editedproperty.amenities,
        }};
        const options = { };
        
        db.collection('properties').updateOne( query, update, options);
        //login user
        return res.status(200);
    }catch(err){
        //console.log(err)
    }
    return res.status(200)
})

module.exports = router;