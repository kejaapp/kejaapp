const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //main data required
    name:           { type: String},
    email:          { type:  String, unique: true},
    password:       { type: String},
    access_token:   { type:  String},//will be used to authenticate user token will be stored in front-end
    //sub-data: used for contacts and more info
    photo:          {type:  String},//profile photo
    mobile:         { type: Number},
    gender:         { type: String},
    school:         { type: String},//will help sort out the searches
    code:           { type: Number},//will be used to refer apartments i.e should most likely be a token on an id
    //Used to keep track of activity
    visitcount:     { type: Number},//number of times the user views a property
    referredcount:  { type: Number},//number of times the referrs a property
    //used for subscription info
    tier:           { type: String},//categorised into user, referrer, ambassador, lister.
    status:         { type: String},// will be used to verify if user is a valid user, email will be sent
    substatus:      { type: Boolean},//subscription status 
    subexpirytime:  { type: String},//subscription expiry
    createdAt:      { type: Date, default: Date.now}
},{timestamps:true})

module.exports = mongoose.model("users",UserSchema);