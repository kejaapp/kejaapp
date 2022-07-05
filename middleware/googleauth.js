const {OAuth2Client} = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

//verify googleauthtoken
exports.VerifyGoogleAuthToken = async ()=>{
    try{
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.OAUTH_CLIENT_ID
        })
        return ticket.getPayload();
    }catch(err){
        console.error('error verifying auth token',err)
    }
}