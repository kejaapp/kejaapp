const express = require('express');
const Property = require('../model/property');

const User = require('../model/user');
const { db } = require('../model/user');

let router = express.Router()

router.post("/",async (req,res)=>{
    //get property details
    const { property } = req.body;

    console.log(property)
    //validate property
    if(!property){
        return res.status(201).send('all inputs are required')
    }
    //check if property exists
    const existingproperty = await Property.findOne({location:property.name})
    
    console.log(existingproperty)
    if(existingproperty ){
        return res.status(201).send('This property already exists, contact support for any enquiries')
    }
    //create property
    const newproperty = await Property.create({
        name:property.name,
        email: property.email,
        price:property.price,
        type:property.type,
        school:property.school,
        area:property.area,
        size:property.size,
        mobile:property.mobile,
        landlordname:property.landlordname,
        location:property.propertyPosition,
        description:property.description,
        amenities:property.amenities,
        policies:property.amenities,
        images:property.newimagearray,
        registration:false,
        verified:false,
        reviews:[],
        likes:0,
        sponsored:false,
        visitedcount:0,
        code: property.code,
    });

    //add referral count to referrer
    try{
        const user = await User.findOne({code:property.code});
        //console.log(user.email)
        if(!user){
            console.log('no user found');
        }
        const query = {email:user.email};
        const update = { $set: {referredcount:(user.referredcount + 1)}};
        const options = { };
                
        db.collection('users').updateOne( query, update, options);
    }catch(err){
        console.log(err)
    }
    //get user with code
    //add count
    console.log('success');
    return res.status(200).json(newproperty)
})

module.exports = router;