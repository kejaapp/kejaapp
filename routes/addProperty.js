const express = require('express');
const Property = require('../model/property');

const User = require('../model/user');
const { db } = require('../model/user');

let router = express.Router()

router.post("/",async (req,res,next)=>{
    //get property details
    const { property } = req.body;

    console.log(property)
    //validate property
    if(!property){
        return res.status(201).send('No details were provided to add a property please try again')
    }
    //check if property exists
    const existingproperty = await Property.findOne({name:property.name})
    
    console.log(existingproperty)
    
    //create property
    if(existingproperty === null){
        console.log('started')
        try{
        const newproperty = await Property.create({
            name:property.name,
            email: property.email,
            price:property.price,
            type:property.type,
            school:property.school,
            area:property.area,
            size:property.size,
            mobile:property.mobile,
            location:property.location,
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
        console.log(newproperty)
        return res.status(200)
    }catch(err){
        console.log(err)
        return res.status(201).send("We could not add this property try again or contact support")
    }
    
    //add referral count to referrer
    if(property.code !== ''){
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
    }
    
    //get user with code
    //add count
    console.log('success');
    }
    return res.status(201).send('This property already exists, contact support for any enquiries')
    
})

module.exports = router;