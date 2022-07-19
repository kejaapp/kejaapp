const cors = require('cors');
const express = require('express');
require('dotenv').config();
require('./config/database.js').connect();

const app = express();
app.use(express.json())
//routes import 
const signup = require('./routes/signup.js');
const login = require('./routes/login.js');
const getUser = require('./routes/getUser.js');
const addProperty = require('./routes/addProperty.js');
const getproperties = require('./routes/getproperties.js');
const getproperty = require('./routes/getproperty.js');
const verifyuser = require('./routes/verifyuser.js');
const createlistingacc = require('./routes/createlistingacc');
const listinglogin = require('./routes/listinglogin');
const getlistedproperties = require('./routes/getlistedproperties.js');
const editProperty = require('./routes/editProperty.js');
const deleteProperty = require('./routes/deleteProperty.js');
const deleteUser = require('./routes/deleteUser.js');
const reportProperty = require('./routes/reportProperty.js');
const addReview = require('./routes/addReview.js');
const booking = require('./routes/booking.js');

const dev = ()=>{
    let status = 'live';
    
    if (status === 'development'){
        return 'http://localhost:3000'
    }else{
        return 'https://www.keja.app'
    }
    
}

app.use(cors(
    {credentials:true, 
    origin: dev()}
));

/*
House Hunters Api's
*/
//signup
app.use('/api/signup',signup);
//login
app.use('/api/login',login);
//getuser
app.use('/api/getuser',getUser);
//verify user
app.use('/api/verify',verifyuser);
//delete user account
app.use('/api/deleteuser',deleteUser)
//report listing
app.use('/api/reportproperty',reportProperty)
//add review
app.use('/api/addreview',addReview)
//book apartment
app.use('/api/bookapartment',booking)

/*
    Listing a property Apis
*/
//create listing account
app.use('/api/createlistingaccount',createlistingacc);
//login listing account
app.use('/api/listinglogin',listinglogin);
//getlistedproperties foe each specific lister
app.use('/api/getlistedproperties',getlistedproperties)
//addproperty
app.use('/api/postproperty',addProperty);
//edit property
app.use('/api/editproperty',editProperty);
//delete property
app.use('/api/deleteproperty',deleteProperty);

/*
    Property Api's
*/

//get properties
app.use('/api/getproperties',getproperties);
//get a specific property
app.use('/api/getproperty',getproperty);


app.get('/',(req,res)=>{
    res.send('success')
})

module.exports = app;