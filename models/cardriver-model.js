const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GeoSchema = new Schema({
    type:{type:String,default:"Point"},
    coordinates:{type:[Number],index:'2dsphere'}
}) 

 let DriverSchema = new Schema({
     email:{
         type:String,
         required:true
     },
     driving:{
         type:Boolean,
         default:false

     },
     geoLocation:GeoSchema
 })

 let Driver= mongoose.model('cardriver-model',DriverSchema)

 module.exports= Driver