const jwt = 'jsonwebtoken';
require('dotenv').config();

const { TOKEN_KEY } = process.env.TOKEN_KEY;

const verifyToken = (req,res,next)=>{
    //get token from body
    const {token,id} = req.body;
    //check if a token exists
    if(!token){
        return res.status(401).send('a token is required');
    }
    //verify the token
    try{
        jwt.verify(token, TOKEN_KEY, (err,verifiedJwt)=>{
            if(err){
                res.send(err.message)
            }
            res.send(verifiedJwt)
        })
        //decode the token
        const decoded = jwt.verify(token, TOKEN_KEY);
        //console.log(decoded);
        //send back a res'
        return res.status(200)
    }catch(err){
        res.status(401).send('The token is invalid');
    }
}

module.exports = verifyToken;