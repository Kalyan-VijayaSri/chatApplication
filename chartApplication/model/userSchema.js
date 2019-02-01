//grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var userSchema = new Schema({
    state: String,
    noI: Number
});

//Create a model and make this available to our user in Node Application
module.exports = mongoose.model("chart",userSchema);
