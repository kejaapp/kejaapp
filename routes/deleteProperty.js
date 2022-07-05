const express = require('express');
const Property = require('../model/property');
const { db } = require('../model/property');
let router = express.Router()

router.post("/",async (req,res)=>{
    //get property details
    const { id } = req.body;

    //console.log(id)
    //validate property
    if(!id){
        return res.status(401).send('all inputs are required')
    }
    //check if property exists
    const existingproperty = await Property.findOne({_id:id})
    
    //console.log(existingproperty.name)
    if(!existingproperty && existingproperty === null){
        return res.status(401).send('no property found')
    }
    //update property id
    try{
        db.collection('properties').findOneAndDelete({_id:existingproperty._id} );
        //login user
        return res.status(200);
    }catch(err){
        //console.log(err)
    }
    return res.status(200)
})

module.exports = router;