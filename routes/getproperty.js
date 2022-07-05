const express = require('express');
const Property = require('../model/property.js')
let router = express.Router();

router.post('/', async(req,res)=>{
    //get property id from header/
    const { id } = req.body;
    //console.log(id);
    //look for existing property 
    if(!id){
        return res.status(401).send('no id found')
    }
    const property = await Property.findOne({_id:id});
    //console.log(property)
    return res.status(200).json(property)
    //return property
});

module.exports = router;