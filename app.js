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

app.use(cors(
    {credentials:true, origin:'http://localhost:3000'}
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


/*
    Listing a property Apis
*/
//create listing account
app.use('/api/createlitingaccount',createlistingacc);
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