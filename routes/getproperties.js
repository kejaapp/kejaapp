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
        const response = (properties?.sort((a,b)=> Number(b.sponsored) - Number(a.sponsored))
                                     .filter((item)=>
                                        item.school?.includes(query.school? query.school : "") && item.type?.includes(query.type? query.type : "") && item.area?.includes(query.area? query.area : "") && item.price?.toString().includes(query.price? query.price : "") 
                                    ));
        // console.log(response)
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;