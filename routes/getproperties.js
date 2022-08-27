const express = require('express')
const Property = require('../model/property.js');

let router = express.Router()

router.post('/',async(req,res)=>{
    //get query params
    const { query } = req.body;
    //console.log( query );
    //use query to find properties
    try{
        const properties = await Property.find();
        //applying query params to get results
        const lowestHigh = properties?.find(n => (n > query?.maxprice));
    
        const within = val => (val > query?.minprice && val < lowestHigh);
        //console.log(properties?.filter((item)=> item.price?.includes(within)))

        const response = (properties?.sort((a,b)=> Number(b.sponsored) - Number(a.sponsored))
                                     .filter((item)=>
                                        item.school?.includes(query.school? query.school : "jkuat") && item.type?.includes(query.type? query.type : "") && item.area?.includes(query.area? query.area : "") && item.name?.toLowerCase().includes(query.value? query.value : "") 
                                    ));
        //console.log(response.filter((item)=> item.price?.includes(within)))
        // console.log(response)
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;