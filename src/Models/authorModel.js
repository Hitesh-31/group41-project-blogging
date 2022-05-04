const {default: mongoose} = require("mongoose");
require('mongoose-type-email')

const authorSchema = new mongoose.Schema ({
fname: {
      type: String,
      required: true,
      trim:true
}, 
lname: {
    type: String,
    required: true,
    trim:true
}, 
title: {
    type: String,
    required: true, 
    enum: ["Mr", "Mrs", "Ms"],
    trim:true
}, 
email: {
    type: mongoose.SchemaTypes.Email, 
    unique: true,
    required: true,
    trim:true
}, 
password: {
    type: String,
    required: true,
    trim:true
} 
},{timestamps: true});

module.exports =mongoose.model('Author', authorSchema)