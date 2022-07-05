const express = require('express');
const User = require('../model/user.js');
//const verifyToken = require('../middleware/auth.js');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get token
    const { token } = req.body;
    //console.log(token)
    //find user
    const user = await User.findOne({access_token:token});
    //console.log(user)
    //returnuser
    if(user){
        return res.status(200).json(user);
    }
    return res.status(401).send('failed')

})

module.exports = router;