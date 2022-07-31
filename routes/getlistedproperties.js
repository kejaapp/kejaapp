const express = require('express')
const Property = require('../model/property.js');

let router = express.Router()

router.post('/',async(req,res)=>{
    //get email to request properties posted by account
    const { email } = req.body;
    //console.log( email );
    //use email to find properties
    try{
        const properties = await Property.find();
        //applying email params to get results
        const response = (properties?.filter((item)=>
                                        item.email?.includes(email) 
                                    ));
        //console.log(response)
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;