const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    name:               { type: String},
    email:              { type : String},
    price:              { type: Number},
    type:               { type: String},
    code:               { type: String},//refcode
    school:             { type: String},
    area:               { type: String},
    size:               { type: String},
    mobile:             { type: String},
    location:           { type: String},
    description:        { type: String},
    amenities:          { type: String},
    policies:           { type: String},
    images:             [{ type: String}],
    reviews:            [ { name: String,
                            body: String}],
    registration:       { type: Boolean},
    verified:           { type: Boolean},
    likes:              { type: Number, default: 0},
    sponsored:          { type: Boolean},
    visitedcount:       { type: Number, default: 0},
    createdAt:          { type: Date, default: Date.now}
},{
    collection: 'properties'
},{timestamps:true})

module.exports = mongoose.model("Property",PropertySchema);


